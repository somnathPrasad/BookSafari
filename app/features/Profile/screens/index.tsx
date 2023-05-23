import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native"
import { LinearGradientColors } from "../../../constants/colors"
import { theme } from "../../../style"
import { Feather } from '@expo/vector-icons';
import { Avatar } from "../../../components/Avatar"
import { useEffect, useState } from "react"
import { auth, firestore } from "../../../lib"
import { COLLECTION } from "../../../constants"
import { Button } from "../../../components/theme"

export const ProfileScreen = () => {
    const user = auth.currentUser;
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUserName = async () => {
            if (!user?.uid) return;
            const doc = await firestore.collection(COLLECTION.USERS).doc(user?.uid).get();
            if (doc.exists) {
                setName(doc.data()?.name)
            }
        }
        getUserName();
    }, [])

    const signOutUser = async () => {
        try {
            setLoading(true);
            await auth.signOut();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <LinearGradient colors={LinearGradientColors} style={theme.screenContainer}>
            <ScrollView contentContainerStyle={{ paddingTop: StatusBar.currentHeight }} showsVerticalScrollIndicator={false}>
                <View className="pt-5">
                    <Text style={styles.text} className="font-manropeExtraBold text-2xl">Profile</Text>
                </View>

                <View className="mt-10">

                    <View className="items-center justify-center">
                        <Avatar source={user?.photoURL} />
                        <Text style={styles.text} className="font-manropeExtraBold text-2xl mt-5">{user?.displayName ?? name}</Text>
                    </View>

                    <View className="mt-10 items-center">
                        <Button onPress={signOutUser} textClassName="text-white" className="bg-transparent border border-slate-50 rounded-3xl w-44" title="Logout" />
                    </View>

                </View>

            </ScrollView>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "#fff"
    },
    message: {
        color: "#fff",
        fontSize: 20,
        textAlign: "center",
    }
})