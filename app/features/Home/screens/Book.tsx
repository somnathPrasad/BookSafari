import { LinearGradient } from "expo-linear-gradient"
import { LinearGradientColors } from "../../../constants/colors"
import { ScrollView, Text, View, StatusBar, StyleSheet, Image, Dimensions } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { HomeStackParamList } from "../../../navigation/tabs/HomeStack"
import { BookInfo } from "../../../components"

const { width } = Dimensions.get("window");

type Props = NativeStackScreenProps<HomeStackParamList, "Book">

export const BookScreen = ({ route }: Props) => {
    const { book } = route.params;
    const { volumeInfo } = book;
    return (
        <LinearGradient colors={LinearGradientColors} className="flex-1">
            <ScrollView contentContainerStyle={{ paddingTop: StatusBar.currentHeight }} showsVerticalScrollIndicator={false}>

                <View className="pt-5 ml-5">
                    <Text style={styles.text} className="font-manropeExtraBold text-2xl">{book.volumeInfo?.title}</Text>
                </View>

                <View className="mt-7 mx-5">
                    <BookInfo subtitleClassName="font-manropeExtraBold text-xl" showTitle={false} coverWidth={150} book={volumeInfo} />
                </View>

                <ScrollView fadingEdgeLength={120} style={{elevation:10}} className="mt-4 mx-5 h-96 bg-purple-800 rounded-xl" contentContainerStyle={{paddingHorizontal:10, paddingVertical:10}}>
                    <Text className="text-white font-manropeSemiBold text-xl">{volumeInfo?.description}</Text>
                </ScrollView>

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
    },
    bookTitle: {
        fontFamily: "Manrope_600SemiBold",
        fontSize: 20,
        color: "#fff",
        width: width - 170
    },
    bookSubtitle: {
        fontFamily: "Manrope_400Regular",
        fontSize: 16,
        color: "#fff",
        marginTop: 4
    },
    bookAuthors: {
        fontFamily: "Manrope_400Regular",
        fontSize: 16,
        color: "#fff",
        marginTop: 4,
        width: width - 150
    }
})