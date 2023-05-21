import { View, Text, Pressable } from "react-native"
import { useState, Dispatch, SetStateAction } from "react"
import { Button, TextInput } from "./theme";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { getMessagesFromFirebaseError } from "../utils";

interface SignUpProps {
    setShowSignUp: Dispatch<SetStateAction<boolean>>;
    onSignUp?: () => void;
}

export const SignUp = ({ setShowSignUp, onSignUp }: SignUpProps) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const createProfile = async (user: any) => {
        const data = {
            name: name,
            uid: user.uid,
        }
        try {
            await firestore().collection('Users').add(data);
        } catch (error) {
            console.log(error)
        }
    }

    const onSignUpButtonPress = async () => {
        if (email && password) {
            setLoading(true);
            try {
                const response = await auth().createUserWithEmailAndPassword(email, password);
                console.log(response)
                if (response?.user) {
                    await createProfile(response.user);
                    onSignUp?.();
                    setLoading(false);
                } else {
                    setLoading(false);
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
            <Text className="font-manropeExtraBold text-3xl text-white pb-2">Sign up</Text>

            <TextInput keyboardType="default" className="mt-10 mb-5" placeholder="Name" onChangeText={(text) => setName(text)} />
            <TextInput keyboardType="email-address" className="mb-5" placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <TextInput keyboardType="visible-password" placeholder="Password" onChangeText={(text) => setPassword(text)} />

            <Text className="font-manropeMedium text-base text-red-600 pb-2 mx-10 mt-5 text-center">{errorMessage}</Text>

            <Button loading={loading} onPress={onSignUpButtonPress} className="mt-8 w-36" title="Sign up" />

            <View className="flex-row">
                <Text className="font-manropeSemiBold text-lg mt-10 pb-2 text-white opacity-50">Already have an account ? </Text>
                <Pressable onPress={() => setShowSignUp(false)}>
                    <Text className="font-manropeSemiBold text-lg mt-10 pb-2 text-white">Login</Text>
                </Pressable>
            </View>
        </>
    )
}
