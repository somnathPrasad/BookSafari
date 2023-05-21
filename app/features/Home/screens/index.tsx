import { LinearGradient } from "expo-linear-gradient"
import { View, Text, FlatList } from "react-native"
import { LinearGradientColors } from "../../../constants/colors"
import { theme } from "../../../style"

export const HomeScreen = () => {
    return (
        <LinearGradient colors={LinearGradientColors} style={theme.screenContainer}>
            <Text style={[theme.titleLarge, { marginTop: 16 }]}>Your bookshelf</Text>
        </LinearGradient>
    )
}