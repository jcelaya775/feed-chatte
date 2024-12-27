import { PropsWithChildren, useEffect } from "react";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{}>;

export default function ParallaxScrollView({ children }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  // TODO: Make sure it scrolls to bottom initially

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        // contentContainerStyle={{ flex: 1 }}
        ref={scrollRef}
        scrollEventThrottle={16}
      >
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222",
    justifyContent: "center",
    borderRadius: 24,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
  },
});
