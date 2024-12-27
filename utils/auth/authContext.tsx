import { createContext, type PropsWithChildren, useContext } from "react";
import { useStorageState } from "../useStorageState";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async () => {
          // TODO: Throw/return error/status
          // Perform sign-in logic here
          // try {
          //   console.log("Calling signIn...");
          //   const signInResponse = await signIn();
          //   console.log({ signInResponse });
          //   if (signInResponse?.type === "success") {
          //     console.log({ signInResponse });
          //     setSession(signInResponse.data.idToken);
          //   }
          // } catch (error) {
          //   console.error("Error in context signIn");
          //   console.error(error);
          // }
          setSession("xxx");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
