import { createContext, type PropsWithChildren, useContext } from "react";
import { useStorageState } from "../useStorageState";
import { GetUsersResponse } from "@/utils/types";

const AuthContext = createContext<{
  signIn: (name: string) => Promise<boolean>;
  signOut: () => void;
  session?: { user: { id: string; name: string } } | null;
  isLoading: boolean;
}>({
  signIn: (name: string) => Promise.resolve(false),
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
        signIn: async (name: string) => {
          try {
            const usersResponse = await fetch(
              `http://localhost:8080/users?name=${name}`,
            );
            const users: GetUsersResponse = await usersResponse.json();
            const user = users?.[0];
            if (!user) {
              await fetch("http://localhost:8080/users", {
                method: "POST",
                body: JSON.stringify({ name }),
              });
            }
            setSession(
              JSON.stringify({
                user: {
                  id: user.id,
                  name,
                },
              }),
            );
            return true;
          } catch (error) {
            console.error(error);
            return false;
          }
        },
        signOut: () => {
          setSession(null);
        },
        session: session ? JSON.parse(session) : null,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
