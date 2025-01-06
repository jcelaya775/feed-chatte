import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";

type Props = {
  id?: string;
  deleteEvent: (id: string) => void;
};

const EditBubble = ({ id, deleteEvent }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.textContainer}>
          <ThemedText type="default">Edit️</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.textContainer}
          onPress={() => deleteEvent(id!)}
        >
          <ThemedText type="default">Delete️</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditBubble;

const styles = StyleSheet.create({
  container: {
    // position: "absolute",
    // bottom: "100%",
    backgroundColor: "#444",
    borderRadius: 24,
    height: 52,
    width: 132,
    paddingHorizontal: 24,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 12,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
