import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function EditBubble() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity style={styles.textContainer}>
          <ThemedText type="default">Edit️</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer}>
          <ThemedText type="default">Delete️</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    position: "absolute",
    bottom: "100%",
    backgroundColor: "#444",
    borderRadius: 24,
    height: 52,
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
