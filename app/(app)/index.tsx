import { Text, View } from "react-native";

import { useSession } from "@/utils/auth/authContext";

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      >
        Sign Out
      </Text>
    </View>
  );
}

// import { Button, Input, Label, Switch, XStack, YStack } from "tamagui";
// import { ThemedView } from "@/components/ThemedView";
// import { SafeAreaView, StyleSheet, View } from "react-native";
// import { useState } from "react";
// import { router } from "expo-router";
// import { ThemedText } from "@/components/ThemedText";
//
// export default function LabelDemo() {
//   const [name, setName] = useState("");
//
//   const handlePress = () => {
//     if (name === "") {
//       alert("Please enter your name.");
//       return;
//     }
//
//     router.push("/home");
//     // Call API to save name into DB and local storage
//     // If successful, continue to home screen
//     // Else, show error message
//
//     // Show error message
//     // alert("Error: Unable to save name. Please try again.");
//   };
//
//   return (
//     <ThemedView style={{ flex: 1 }}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.container}>
//           <ThemedText
//             type="title"
//             style={{ textAlign: "center", marginBottom: 64 }}
//           >
//             Login
//           </ThemedText>
//           <YStack padding="$3" minWidth={325} space="$4">
//             <XStack alignItems="center" space="$4">
//               <Label width={90} htmlFor="name">
//                 Name
//               </Label>
//               <Input
//                 flex={1}
//                 id="name"
//                 defaultValue=""
//                 onChangeText={(text) => setName(text)}
//               />
//             </XStack>
//
//             <XStack alignItems="center" space="$4">
//               <Label width={90} htmlFor="notify">
//                 Notifications
//               </Label>
//               <Switch id="notify">
//                 <Switch.Thumb animation="quick" />
//               </Switch>
//             </XStack>
//
//             <Button onPress={handlePress}>Continue</Button>
//           </YStack>
//         </View>
//       </SafeAreaView>
//     </ThemedView>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     // padding: 20,
//   },
// });
