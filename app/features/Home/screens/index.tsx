import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native"
import { LinearGradientColors } from "../../../constants/colors"
import { theme } from "../../../style"
import { BookInfo } from "../../../components"
import { useEffect, useState } from "react"
import { BookType } from "../../../lib/types"
import { auth, firestore } from "../../../lib"
import { COLLECTION } from "../../../constants"

export const HomeScreen = () => {
    const [books, setBooks] = useState<BookType[]>([])
    const user = auth.currentUser;

    useEffect(() => {
        if (!user) return;
        const path = `${COLLECTION.BOOKSHELF}/${user.uid}`;
        const subscriber = firestore.doc(path).onSnapshot((snapshot) => {
            if (!snapshot.exists) return;
            setBooks(snapshot.data()?.books);
        })

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [])

    return (
        <LinearGradient colors={LinearGradientColors} style={theme.screenContainer}>
            <ScrollView contentContainerStyle={{ paddingTop: StatusBar.currentHeight }} showsVerticalScrollIndicator={false}>
                <View className="pt-5">
                    <Text style={styles.text} className="font-manropeExtraBold text-2xl">Your Bookshelf</Text>
                </View>
                <View className="mt-5">

                    {books.length === 0 && <Text style={styles.message}>No books found</Text>}

                    {books.map((book: BookType) => <View key={book.id} className="mt-5"><BookInfo book={book.volumeInfo} /></View>)}

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