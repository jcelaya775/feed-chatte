// import {
//   GoogleSignin,
//   isErrorWithCode,
//   isSuccessResponse,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
//
// export const signIn = async () => {
//   try {
//     const hasPlayServices = await GoogleSignin.hasPlayServices();
//     console.log({ hasPlayServices });
//     const response = await GoogleSignin.signIn();
//     console.log({ response });
//     if (isSuccessResponse(response)) {
//       console.log("Signed in with Google successfully");
//       response.data;
//       return response;
//       // setState({ userInfo: response.data });
//     } else {
//       console.log("Sign in cancelled by user");
//       // sign in was cancelled by user
//     }
//   } catch (error) {
//     console.log("Error signing in with Google in auth signIn");
//     console.error(error);
//     if (isErrorWithCode(error)) {
//       switch (error.code) {
//         case statusCodes.IN_PROGRESS:
//           console.log("Status: IN_PROGRESS");
//           // operation (eg. sign in) already in progress
//           break;
//         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//           console.log("Status: PLAY_SERVICES_NOT_AVAILABLE");
//           // Android only, play services not available or outdated
//           break;
//         default:
//           console.log("Status: some other error happened");
//         // some other error happened
//       }
//     } else {
//       console.log("An error that's not related to google sign in occurred");
//       // an error that's not related to google sign in occurred
//     }
//   }
// };
