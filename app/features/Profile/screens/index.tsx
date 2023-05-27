import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native"
import { LinearGradientColors } from "../../../constants/colors"
import { theme } from "../../../style"
import { Avatar } from "../../../components/Avatar"
import { useEffect, useState } from "react"
import { auth } from "../../../lib"
import { Button } from "../../../components/theme"
import firebase from "../../../lib/firebase"

export const ProfileScreen = () => {
    const user = auth.currentUser;
    const [name, setName] = useState("");

    useEffect(() => {
        const getUserName = async () => {
            const user = await firebase.getUserProfile();
            if (!user) return;
            setName(user?.name)
        }
        getUserName();
    }, [])

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
                        <Button onPress={() => firebase.signOut()} textClassName="text-white" className="bg-transparent border border-slate-50 rounded-3xl w-44" title="Logout" />
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