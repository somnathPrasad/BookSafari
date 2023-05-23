import React, { createContext, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface AuthContextInterface {
    user: FirebaseAuthTypes.User | null,
    setUser: React.Dispatch<React.SetStateAction<FirebaseAuthTypes.User | null>>
}

export const AuthContext = createContext<AuthContextInterface>({ user: null, setUser: () => { } });

export function AuthProvider({ children, fetchedUser }: { children: React.ReactNode, fetchedUser: FirebaseAuthTypes.User | null }) {

    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(fetchedUser);

    const fetchDisplayName = async () => {
        
    }

    if(user?.displayName === null) {
        
    }

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}