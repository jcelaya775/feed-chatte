import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export default function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText style={{ fontSize: 24 }}>Settings ⚙️</ThemedText>
    </View>
  );
}
