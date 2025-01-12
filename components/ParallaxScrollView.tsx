import { PropsWithChildren, useEffect } from "react";
import Animated, { AnimatedRef } from "react-native-reanimated";
import { RefreshControl, StyleSheet, View } from "react-native";

type Props = PropsWithChildren<{
  scrollRef: AnimatedRef<Animated.ScrollView>;
  refreshing: boolean;
  setRefreshing: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
  contentContainerStyle?: Record<string, unknown>;
}>;

export default function ParallaxScrollView({
  children,
  scrollRef,
  refreshing,
  setRefreshing,
  fetchData,
  contentContainerStyle,
}: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: false });
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onStartShouldSetResponder={() => true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ref={scrollRef}
        scrollEventThrottle={16}
        overScrollMode={"auto"}
        scrollToOverflowEnabled={true}
      >
        <View style={contentContainerStyle}>{children}</View>
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
});
