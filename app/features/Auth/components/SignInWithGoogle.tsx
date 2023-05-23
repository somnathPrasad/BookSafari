import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { createUser } from "../utils";

export const SignInWithGoogle = () => {

    async function onGoogleButtonPress() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            const userCredentials = await auth().signInWithCredential(googleCredential);

            if(userCredentials.additionalUserInfo?.isNewUser){
                console.log("New User")
                await createUser(userCredentials);
            }

        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }

    }

    return (
        <TouchableHighlight className="bg-black px-10 py-5 rounded-xl items-center justify-center border border-slate-900" onPress={onGoogleButtonPress} style={styles.googleButton}>
            <View className="flex-row items-start justify-start">
                <Ionicons name="logo-google" size={30} color="white" />
                <Text style={styles.text} className="text-center font-manropeExtraBold">  Sign up using Google</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 24
    },
    googleButton: {
        elevation: 5,
    }
})