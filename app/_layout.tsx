import { Slot, SplashScreen } from "expo-router";
import "react-native-reanimated";
import { SessionProvider } from "@/utils/auth/authContext";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { createTamagui, TamaguiProvider } from "tamagui";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { StatusBar } from "expo-status-bar";
import { config } from "@tamagui/config/v3";

// GoogleSignin.configure({
//   webClientId:
//     "976872453823-1mlb2osvefn4dv81b1skvqtetuqs7uf5.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
//   scopes: ["email", "profile"], // what API you want to access on behalf of the user, default is email and profile
//   // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
//   // hostedDomain: "", // specifies a hosted domain restriction
//   // forceCodeForRefreshToken: false, // [Android] related to `serverAuthCode`, read the docs link below *.
//   // accountName: "", // [Android] specifies an account name on the device that should be used
//   // iosClientId: "<FROM DEVELOPER CONSOLE>", // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
//   // googleServicePlistPath: "", // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. "GoogleService-Info-Staging"
//   // openIdRealm: "", // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
//   // profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
// });

const tamaguiConfig = createTamagui(config);

// TypeScript types across all Tamagui APIs
type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SessionProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <TamaguiProvider config={tamaguiConfig} defaultTheme="dark_green">
          <Slot />
          <StatusBar style="auto" />
        </TamaguiProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
