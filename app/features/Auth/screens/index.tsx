import { LinearGradient } from "expo-linear-gradient"
import { Text, View } from "react-native"
import { SignInWithFacebook, SignInWithGoogle } from "../components";

export const AuthScreen = () => {
    return (
        <LinearGradient colors={["#a277ed", "#000000"]} className="flex-1 bg-teal-950 items-center">
            <Text style={{ lineHeight: 100 }} className="text-white font-pacifico mt-32 text-6xl">Book Safari</Text>
            <Text></Text>
            <View className="absolute bottom-20 px-5">
                {/* <SignInWithFacebook /> */}
                <SignInWithGoogle />
            </View>
        </LinearGradient>
    )
}