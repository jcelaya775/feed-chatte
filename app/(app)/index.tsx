import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import EventBubble from "@/components/MessageBubble";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useSession } from "@/utils/auth/authContext";
import { Button } from "tamagui";
import { ThemedText } from "@/components/ThemedText";
import { Event, GetEventsResponse } from "@/utils/types";

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
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

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
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 1,
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
              flex: 2,
            }}
          >
            <View style={styles.outerContainer}>
              <ParallaxScrollView scrollRef={scrollRef}>
                <View style={styles.innerContainer}>
                  {events &&
                    events.map((event, index) => {
                      return (
                        <EventBubble
                          key={index}
                          message={event.message}
                          time={event.time}
                          align={
                            session?.user.id === event.userId ? "right" : "left"
                          }
                        />
                      );
                    })}
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
  messageContainer: {
    flex: 1,
  },
  container: {
    justifyContent: "space-between",
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  innerContainer: {
    paddingTop: 12,
    gap: 12,
  },
});
