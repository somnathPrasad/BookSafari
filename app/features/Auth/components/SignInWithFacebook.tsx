import { Text, View, TouchableHighlight, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

export const SignInWithFacebook = () => {
    return (
        <TouchableHighlight className="bg-black px-10 py-5 rounded-xl items-center justify-center border border-slate-900 mt-2" onPress={() => console.log("pressed")} style={styles.googleButton}>
            <View className="flex-row items-center justify-center">
                <Ionicons name="logo-facebook" size={30} color="white" />
                <Text style={styles.text} className="text-center font-manropeExtraBold">  Sign up using Facebook</Text>
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