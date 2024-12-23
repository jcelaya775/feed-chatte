import { PropsWithChildren, useEffect } from "react";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { StyleSheet, View } from "react-native";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{}>;

export default function ParallaxScrollView({ children }: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  // TODO: Make sure it scrolls to bottom initially

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, []);

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
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    gap: 16,
    overflow: "hidden",
  },
});
