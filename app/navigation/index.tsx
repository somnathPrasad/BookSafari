import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { AuthScreen } from "../features/Auth/screens";
import { TabNavigator } from "./tabs";

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

export const AuthNavigation = () => {
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '197822332931-ob3uci70or8gdaa1faf24rdt8mjm4elk.apps.googleusercontent.com',
        });
    }, [])
    return (
        <AuthStack.Navigator screenOptions={{headerShown:false}}>
            <AuthStack.Screen name="Auth" component={AuthScreen} />
        </AuthStack.Navigator>
    )
}

export const AppNavigation = () => {
    return (
        <AppStack.Navigator screenOptions={{headerShown:false}}>
            <AppStack.Screen name="Home" component={TabNavigator} />
        </AppStack.Navigator>
    )
}