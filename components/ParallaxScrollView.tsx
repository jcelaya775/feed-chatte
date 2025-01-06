import { PropsWithChildren, useEffect } from "react";
import Animated, { AnimatedRef } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  scrollRef: AnimatedRef<Animated.ScrollView>;
}>;

export default function ParallaxScrollView({ children, scrollRef }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        // contentContainerStyle={{ overflow: "visible" }}
        // style={{ overflow: "visible" }}
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
    flex: 1,
    backgroundColor: "#222",
    justifyContent: "center",
    borderRadius: 24,
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 16,
  },
});
