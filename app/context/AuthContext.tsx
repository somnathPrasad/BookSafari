import React, { createContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface AuthContextInterface {
    user: FirebaseAuthTypes.User | null,
    setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>
}

export const AuthContext = createContext<AuthContextInterface>({ user: null, setUser: () => { } });

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user:FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [])

    if (initializing) return null;

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}