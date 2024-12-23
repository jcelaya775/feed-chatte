import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, View } from "react-native";

type Props = {
  message: string;
  // TODO: Change to DateTime or something
  time: string;
  align?: "left" | "right";
};

// TODO: Fix bubble to size of text
export default function MessageBubble({ message, time, align }: Props) {
  return (
    <View>
      <View
        style={[
          styles.container,
          align === "left"
            ? { alignSelf: "flex-start" }
            : { alignSelf: "flex-end" },
        ]}
      >
        <View style={styles.messageBubble}>
          <ThemedText>{message}</ThemedText>
          {/*<View*/}
          {/*  style={[*/}
          {/*    styles.triangle,*/}
          {/*    align === "left" ? { left: 18 } : { right: 18 },*/}
          {/*  ]}*/}
          {/*/>*/}
        </View>
      </View>
      <ThemedText
        style={[
          styles.time,
          { fontSize: 14 },
          align === "left"
            ? { alignSelf: "flex-start" }
            : { alignSelf: "flex-end" },
        ]}
      >
        {time}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  messageBubble: {
    backgroundColor: "#1cb64a",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  time: {
    display: "flex",
    color: "#ccc",
    fontSize: 12,
    // paddingTop: 2,
    paddingHorizontal: 16,
  },
  triangle: {
    borderTopColor: "#1cb64a",
    position: "absolute",
    top: 32,
    width: 0,
    height: 0,
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
