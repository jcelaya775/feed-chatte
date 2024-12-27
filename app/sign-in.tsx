import { router } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSession } from "@/utils/auth/authContext";
import { ThemedText } from "@/components/ThemedText";
import { Button, Input, Label, Switch, XStack, YStack } from "tamagui";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";

export default function SignIn() {
  const { signIn } = useSession();
  const [name, setName] = useState("");

  const handleSignIn = () => {
    if (name === "") {
      alert("Please enter your name.");
      return;
    }

    // TODO: Handle DB and signIn error
    signIn();
    console.log("Sign-in successful");
    setName("");
    // Navigate after signing in. You may want to tweak this to ensure sign-in is
    // successful before navigating.
    router.replace("/");
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <ThemedText
            type="title"
            style={{ textAlign: "center", marginBottom: 64 }}
          >
            Login
          </ThemedText>
          <YStack padding="$3" minWidth={325} space="$4">
            <XStack alignItems="center" space="$4">
              <Label width={90} htmlFor="name">
                Name
              </Label>
              <Input
                flex={1}
                id="name"
                defaultValue=""
                onChangeText={(text) => setName(text)}
              />
            </XStack>

            <XStack alignItems="center" space="$4">
              <Label width={90} htmlFor="notify">
                Notifications
              </Label>
              <Switch id="notify">
                <Switch.Thumb animation="quick" />
              </Switch>
            </XStack>

            <Button onPress={handleSignIn}>Login</Button>
          </YStack>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
