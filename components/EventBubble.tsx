import { ThemedText } from "@/components/ThemedText";
import { Pressable, StyleSheet, Vibration, View } from "react-native";
import React, { Dispatch, SetStateAction, useContext } from "react";
import EditBubble from "./EditBubble";
import { TouchContext } from "@/utils/context";

type Props = {
  id?: string;
  message: string;
  time?: Date;
  align?: "left" | "right";
  noMenu?: boolean;
  menu?: string | null | undefined;
  setMenu?: Dispatch<SetStateAction<string | null | undefined>>;
  deleteEvent?: (id: string) => void;
};

export default function EventBubble({
  id,
  message,
  time,
  align,
  noMenu,
  menu,
  setMenu,
  deleteEvent,
}: Props) {
  const { screenTouched, setScreenTouched } = useContext(TouchContext);
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
        {menu === id && !screenTouched && (
          <EditBubble id={id} deleteEvent={deleteEvent!} />
        )}
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed && !noMenu ? 0.5 : 1.0 },
            styles.messageBubble,
          ]}
          onLongPress={() => {
            if (noMenu || !id) {
              return;
            }
            setScreenTouched(false);

            Vibration.vibrate(5);
            setMenu!(id);
          }}
          onTouchStart={() => {
            // Close the menu
            if (menu) {
              setMenu!(null);
            }
          }}
        >
          <ThemedText>{message || "I'm hungry now."}</ThemedText>
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
  popover: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
  popoverContent: {
    alignItems: "center",
    backgroundColor: "white",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
  },
});
