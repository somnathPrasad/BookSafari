import { LinearGradient } from "expo-linear-gradient"
import { View, Text, ScrollView, StatusBar, StyleSheet } from "react-native"
import { LinearGradientColors } from "../../../constants/colors"
import { theme } from "../../../style"

export const SettingsScreen = () => {
    return (
        <LinearGradient colors={LinearGradientColors} style={theme.screenContainer}>
            <ScrollView contentContainerStyle={{ paddingTop: StatusBar.currentHeight }} showsVerticalScrollIndicator={false}>
                <View className="pt-5">
                    <Text style={styles.text} className="font-manropeExtraBold text-2xl">Settings</Text>
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