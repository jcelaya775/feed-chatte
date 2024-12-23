import { Dimensions, Image, Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import MessageBubble from "@/components/MessageBubble";
import { ThemedText } from "@/components/ThemedText";
import { HelloWave } from "@/components/HelloWave";
import Animated, {
  Easing,
  ReduceMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { ThemedView } from "@/components/ThemedView";

type User = {
  Name: string;
  Age: number;
  Birthday: string;
  FavoriteColor: string;
};

type Message = {
  message: string;
  // TODO: Change to DateTime or something
  time: string;
  align?: "left" | "right";
};

const messages: Message[] = [
  {
    message: "Jorge fed the fat boy!",
    time: "12:00 pm",
    align: "right",
  },
  {
    message: "Jazmin fed mungus crackers.",
    time: "5:00 pm",
    align: "left",
  },
  {
    message: "Mom has fed the big chungus some crackers.",
    time: "7:00 pm",
    align: "left",
  },
  {
    message: "Jorge fed the fat boy!",
    time: "12:00 pm",
    align: "right",
  },
  {
    message: "Jazmin fed mungus crackers.",
    time: "5:00 pm",
    align: "left",
  },
  {
    message:
      "Mom has fed the big chungus some crackers. It was a good time for him, today.",
    time: "7:00 pm",
    align: "left",
  },
  {
    message: "Jorge fed the fat boy!",
    time: "12:00 pm",
    align: "right",
  },
  {
    message: "Jazmin fed mungus crackers.",
    time: "5:00 pm",
    align: "left",
  },
  {
    message: "Mom has fed the big chungus some crackers.",
    time: "7:00 pm",
    align: "left",
  },
];

export default function HomeScreen() {
  // const [users, setUsers] = useState<User[]>();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get("screen").width;
  const screenHeight = Dimensions.get("screen").height;
  const marginLeft = useSharedValue(-screenWidth * 2);

  useEffect(() => {
    marginLeft.value = withRepeat(
      withTiming(marginLeft.value + screenWidth * 2, {
        duration: 6000,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.Never,
      }),
      -1,
      false,
      undefined,
      ReduceMotion.Never,
    );
  }, []);

  // const animatedStyles = useAnimatedStyle(() => ({
  //   marginLeft: withTiming(scrollX.value),
  // }));

  // const getUsers = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/users");
  //     const users = await res.json();
  //     setUsers(users);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //
  // useEffect(() => {
  //   getUsers();
  // }, []);

  return (
    <ThemedView style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.titleContainer,
          {
            width: screenWidth * 4,
            justifyContent: "space-around",
            backgroundColor: "blue",
            paddingVertical: 10,
            marginTop: Platform.OS === "web" ? insets.top : insets.top + 12,
            transform: [{ translateX: marginLeft }],
            zIndex: 1,
          },
        ]}
      >
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <ThemedText type="title" style={{ zIndex: 1 }}>
            Welcome, There!
          </ThemedText>
          <HelloWave />
          <ThemedText type="defaultSemiBold">Feed Louie!! 😱</ThemedText>
        </View>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <ThemedText type="title" style={{ zIndex: 1 }}>
            Welcome!
          </ThemedText>
          <HelloWave />
          <ThemedText type="defaultSemiBold">Feed Louie!! 😱</ThemedText>
        </View>
      </Animated.View>

      <Animated.View
        style={{
          position: "absolute",
          zIndex: 0,
          transform: [
            { translateX: screenWidth / 2 - 140.5 },
            { translateY: screenHeight / 2 - 249 },
          ],
        }}
      >
        <Image
          source={require("@/assets/images/fat-cat.gif")}
          resizeMode="contain"
        />
      </Animated.View>

      <ParallaxScrollView>
        <View
          style={{
            ...styles.inner,
            paddingBottom: Math.max(insets.bottom, 24),
            paddingTop: Math.max(insets.bottom, 32),
          }}
        >
          <View style={{ ...styles.messageContainer, gap: 24 }}>
            {messages &&
              messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  message={message.message}
                  time={message.time}
                  align={message.align}
                />
              ))}
          </View>
        </View>
      </ParallaxScrollView>
    </ThemedView>
  );
}

// {/*<View style={{ paddingTop: 8, position: "relative" }}>*/}
// {/*<SendMessageBubble />*/}
// {/*</View>*/}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  messageContainer: {
    flexDirection: "column",
    gap: 16,
  },
  container: {
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  inner: {
    flex: 1,
    padding: 12,
    justifyContent: "space-around",
  },
});
