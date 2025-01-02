import { Image, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import EventBubble from "@/components/MessageBubble";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/utils/auth/authContext";
import { Button } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import { Event, GetEventsResponse } from "@/utils/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import EditBubble from "@/components/EditBubble";

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

export default function HomeScreen() {
  const { session } = useSession();
  const [events, setEvents] = useState<Event[]>([]);
  const [activeBubbleMenu, setActiveBubbleMenu] = useState<string | null>();

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const insets = useSafeAreaInsets();

  const updateEvents = async () => {
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

  useEffect(() => {
    updateEvents().then(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [events]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView
        style={[
          { flex: 1 },
          Platform.OS === "android" && {
            marginTop: insets.top,
            // marginBottom: insets.bottom,
          },
        ]}
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
            <View
              style={{ position: "absolute", zIndex: 1, top: 24, right: 12 }}
            >
              <EventBubble
                message="Hey, feed me!"
                align="left"
                triangle={true}
                id="fake"
                menu={activeBubbleMenu}
                setMenu={setActiveBubbleMenu}
              />
            </View>
            <Image
              style={{
                aspectRatio: 1,
                borderRadius: 100,
                width: "80%",
                height: "80%",
              }}
              source={IMAGES.hungry.uri}
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
                        {activeBubbleMenu === event.id && <EditBubble />}
                        <EventBubble
                          id={event.id}
                          message={event.message}
                          time={event.time}
                          align={
                            session?.user.id === event.userId ? "right" : "left"
                          }
                          menu={activeBubbleMenu}
                          setMenu={setActiveBubbleMenu}
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

                await updateEvents();
              }}
            >
              <ThemedText type="defaultSemiBold">Feed Louie! 🍔</ThemedText>
            </Button>
          </View>
        </View>
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
    paddingTop: 12,
    gap: 12,
  },
});
