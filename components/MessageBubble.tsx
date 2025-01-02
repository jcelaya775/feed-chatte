import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleSheet, Vibration, View } from "react-native";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id?: string;
  message: string;
  time?: Date;
  align?: "left" | "right";
  triangle?: boolean;
  menu?: string | null | undefined;
  setMenu: Dispatch<SetStateAction<string | null | undefined>>;
};

export default function MessageBubble({
  id,
  message,
  time,
  align,
  triangle,
  menu,
  setMenu,
}: Props) {
  const timeString = time?.toLocaleTimeString().replace(/:\d{2}\s/, " ");

  return (
    <View
      style={[
        align === "left"
          ? { alignSelf: "flex-start" }
          : { alignSelf: "flex-end" },
      ]}
    >
      <View>
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed && !triangle ? 0.5 : 1.0 },
            styles.messageBubble,
          ]}
          onLongPress={() => {
            if (triangle || !id) {
              return;
            }

            Vibration.vibrate(5);
            setMenu(id);
          }}
          onTouchStart={() => {
            // For closing the menu
            if (menu) {
              setMenu(null);
            }
          }}
        >
          <ThemedText>{message}</ThemedText>
          {triangle && (
            <View
              style={[
                styles.triangle,
                align === "left" ? { left: 18 } : { right: 18 },
              ]}
            />
          )}
        </Pressable>
      </View>
      {time && (
        <ThemedText
          style={[
            styles.time,
            { fontSize: 14 },
            align === "left"
              ? { alignSelf: "flex-start" }
              : { alignSelf: "flex-end" },
          ]}
        >
          {timeString}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 16,
  },
  triangle: {
    zIndex: -1,
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
