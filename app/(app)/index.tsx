import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import EventBubble from "@/components/MessageBubble";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { createContext, useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/utils/auth/authContext";
import { Button } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import { ChatteStatus, Event, GetEventsResponse } from "@/utils/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const IMAGES = {
  chungusHungry: {
    uri: require("@/assets/images/chungus-hungry.png"),
  },
  hungry: {
    uri: require("@/assets/images/hungry.jpg"),
  },
  chungusFull: {
    uri: require("@/assets/images/chungus-full.jpg"),
  },
};

type TouchContext = {
  screenTouched: boolean;
  setScreenTouched: (touched: boolean) => void;
};

export const TouchContext = createContext<TouchContext>({
  screenTouched: false,
  setScreenTouched: () => {},
});

export default function HomeScreen() {
  const { session } = useSession();
  const [showChatteBubble, setShowChatteBubble] = useState(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [chatteMessage, setChatteMessage] = useState<string>("...");
  const [chatteStatus, setChatteStatus] = useState<ChatteStatus>();
  const [screenTouched, setScreenTouched] = useState(false);
  const [activeBubbleMenu, setActiveBubbleMenu] = useState<string | null>();

  const chatteImage = (() => {
    switch (chatteStatus) {
      case "starving":
        return IMAGES.chungusHungry.uri;
      case "hungry":
        return IMAGES.hungry.uri;
      case "slightlySatisfied":
        return IMAGES.hungry.uri;
      case "satisfied":
        return IMAGES.hungry.uri;
      case "full":
        return IMAGES.chungusFull.uri;
    }
  })();

  useEffect(() => {
    console.log({ chatteStatus });
  }, [chatteStatus]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const insets = useSafeAreaInsets();

  const getEvents = async () => {
    const res = await fetch("http://localhost:8080/events?today=true");
    if (!res.ok) {
      alert("An error occurred while fetching events.");
      return;
    }
    const events: GetEventsResponse = await res.json();
    events.forEach((event: Event) => {
      event.time = new Date(event.time);
    });
    setEvents(events);
  };

  const getChatteMessage = async () => {
    const res = await fetch("http://localhost:8080/chatte-message");
    if (!res.ok) {
      alert("An error occurred while fetching Chatte's message.");
      return;
    }
    const message = await res.json();
    setChatteMessage(message.message);
    setChatteStatus(message.status);
    setShowChatteBubble(true);
    setScreenTouched(false);
  };

  const deleteEvent = async (id: string) => {
    const res = await fetch(`http://localhost:8080/events/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("An error occurred while deleting the event.");
      return;
    }
    await getEvents();
    await getChatteMessage();
  };

  useEffect(() => {
    getChatteMessage();
    getEvents();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [events]);

  useEffect(() => {
    if (screenTouched && showChatteBubble) {
      setShowChatteBubble(false);
    }
  }, [screenTouched]);

  return (
    <ThemedView style={[{ flex: 1 }]}>
      <SafeAreaView
        style={[
          { flex: 1 },
          Platform.OS === "android" && {
            marginTop: insets.top,
            // marginBottom: insets.bottom,
          },
          Platform.OS === "web" && {
            width: 768,
            alignSelf: "center",
            marginBottom: 16,
          },
        ]}
      >
        <TouchContext.Provider value={{ screenTouched, setScreenTouched }}>
          <TouchableWithoutFeedback
            onPress={() => {
              setScreenTouched(true);
            }}
          >
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 8,
                  position: "relative",
                }}
              >
                {!screenTouched && showChatteBubble && (
                  <View
                    onTouchEnd={() => setShowChatteBubble(false)}
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      top: -10,
                      left: "30%",
                    }}
                  >
                    <EventBubble
                      message={chatteMessage}
                      align="left"
                      id="fake"
                      noMenu={true}
                    />
                    <Pressable style={styles.triangle} />
                  </View>
                )}
                <Image
                  style={{
                    aspectRatio: 1,
                    borderRadius: 100,
                    width: "80%",
                    height: "80%",
                  }}
                  source={chatteImage}
                  resizeMode="contain"
                />
              </View>
              <View
                style={{
                  flex: 3,
                }}
              >
                <View style={styles.outerMessageContainer}>
                  <ParallaxScrollView scrollRef={scrollRef}>
                    <View style={styles.innerMessageContainer}>
                      {events &&
                        events.map((event, index) => (
                          <View
                            key={index}
                            style={{
                              alignItems:
                                session?.user.id === event.userId
                                  ? "flex-end"
                                  : "flex-start",
                            }}
                          >
                            <EventBubble
                              id={event.id}
                              message={event.message}
                              time={event.time}
                              align={
                                session?.user.id === event.userId
                                  ? "right"
                                  : "left"
                              }
                              menu={activeBubbleMenu}
                              setMenu={setActiveBubbleMenu}
                              deleteEvent={deleteEvent}
                            />
                          </View>
                        ))}
                    </View>
                  </ParallaxScrollView>
                </View>
                <Button
                  style={{
                    marginTop: 16,
                    marginHorizontal: 12,
                    borderRadius: 24,
                  }}
                  onPress={async () => {
                    const res = await fetch("http://localhost:8080/events", {
                      method: "POST",
                      body: JSON.stringify({
                        name: session?.user.name,
                      }),
                    });
                    if (res.ok) {
                      console.log("Event created");
                    } else {
                      alert("An error occurred while creating the event.");
                    }

                    await getEvents();
                    await getChatteMessage();
                  }}
                >
                  <ThemedText type="defaultSemiBold">Feed Louie! 🍔</ThemedText>
                </Button>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchContext.Provider>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  outerMessageContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  innerMessageContainer: {
    flex: 1,
    paddingTop: 12,
    gap: 12,
  },
  triangle: {
    zIndex: -1,
    borderTopColor: "#1cb64a",
    position: "absolute",
    top: 32,
    left: 56,
    borderStyle: "solid",
    borderTopWidth: 32,
    borderRightWidth: 22,
    borderBottomWidth: 0,
    borderLeftWidth: 22,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
});
