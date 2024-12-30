import { PropsWithChildren } from "react";
import Animated, { AnimatedRef } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  scrollRef: AnimatedRef<Animated.ScrollView>;
}>;

export default function ParallaxScrollView({ children, scrollRef }: Props) {
  return (
    <View style={styles.container}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
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
