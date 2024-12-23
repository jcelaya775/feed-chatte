import { StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";

export function SendMessageBubble() {
  const [text, onChangeText] = useState("Initial text");
  const insets = useSafeAreaInsets();

  return (
    <TextInput
      value={text}
      onChangeText={onChangeText}
      style={[
        styles.container,
        { marginBottom: insets.bottom + 12, color: "#222" },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    width: "auto",
    borderRadius: 24,
    display: "flex",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 8,
    marginHorizontal: 14,
  },
});
