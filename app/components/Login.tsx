import { View, Text, Pressable } from "react-native"
import { useState, Dispatch, SetStateAction } from "react"
import { Button, TextInput } from "./theme";
import { getMessagesFromFirebaseError } from "../utils";
import { auth } from "../lib";

interface LoginProps {
    setShowSignUp: Dispatch<SetStateAction<boolean>>;
    onLogin?: () => void;
}

export const Login = ({ setShowSignUp, onLogin }: LoginProps) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onLoginButtonPress = async () => {
        if (email && password) {
            setLoading(true);
            try {
                const response = await auth.signInWithEmailAndPassword(email, password);
                setLoading(false);
                if (response?.user) {
                    onLogin?.();
                }
            } catch (error) {
                setErrorMessage(getMessagesFromFirebaseError(error));
                setLoading(false);
                console.log(error)
            }
        }
    }

    return (
        <>
            <Text className="font-manropeExtraBold text-3xl text-white pb-2">Login</Text>

            <TextInput className="mt-10 mb-5" placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} />

            <Text className="font-manropeMedium text-base text-red-600 pb-2 mx-10 mt-5 text-center">{errorMessage}</Text>

            <Button loading={loading} onPress={onLoginButtonPress} className="mt-8 w-32" title="Login" />

            <View className="flex-row">
                <Text className="font-manropeSemiBold text-lg mt-10 pb-2 text-white opacity-50">Don't have an account ? </Text>
                <Pressable onPress={() => setShowSignUp(true)}>
                    <Text className="font-manropeSemiBold text-lg mt-10 pb-2 text-white">Sign up</Text>
                </Pressable>
            </View>
        </>
    )
}