import { Redirect, Stack } from "expo-router";
import { useSession } from "@/utils/auth/authContext";
import { ThemedText } from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

export default function AppLayout() {
  const { session, isLoading } = useSession();
  const colorScheme = useColorScheme();
  console.log({ session, isLoading });

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    console.log("Loading...");
    return <ThemedText>Loading...</ThemedText>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  console.log("App layout");
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    //   <Stack screenOptions={{ animation: "none" }}>
    //     <Stack.Screen name="index" options={{ headerShown: false }} />
    //     <Stack.Screen name="home" options={{ headerShown: false }} />
    //   </Stack>
    // </ThemeProvider>
  );
}
