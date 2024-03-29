import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions } from "react-native"
import { LinearGradientColors } from "../../../constants/colors"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BookType } from "../../../lib/types"
import { COLLECTION } from "../../../constants"
import { Book, ManageBookSheetBody } from "../components"
import { BottomSheetModal } from "../../../components"
import { BottomSheetModal as BottomSheetModalType } from '@gorhom/bottom-sheet';
import { auth, firestore } from "../../../lib"
import { HomeStackParamList } from "../../../navigation/tabs/HomeStack"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

type Props = NativeStackScreenProps<HomeStackParamList, "Home">

export const HomeScreen = ({ navigation }: Props) => {
    const [books, setBooks] = useState<BookType[]>([])
    const bottomSheetRef = useRef<BottomSheetModalType>(null);
    const snapPoints = useMemo(() => ['60%'], []);
    const [pressedBook, setPressedBook] = useState<BookType | null>(null);
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

    const onBookLongPress = useCallback((book: BookType) => {
        setPressedBook(book);
        bottomSheetRef.current?.present();
    }, [])

    return (
        <LinearGradient colors={LinearGradientColors} className="flex-1">
            <ScrollView contentContainerStyle={{ paddingTop: StatusBar.currentHeight }} showsVerticalScrollIndicator={false}>

                <View className="pt-5 ml-5">
                    <Text style={styles.text} className="font-manropeExtraBold text-2xl">Your Bookshelf</Text>
                </View>

                <View className="mt-5">

                    {books.length === 0 && <Text style={styles.message}>No books found</Text>}

                    {books.map((book: BookType) =>
                        <Book
                            onLongPress={() => onBookLongPress(book)}
                            onPress={() => navigation.navigate("Book", { book })}
                            book={book}
                            key={book.id} className="mt-2"
                        />)}

                </View>

            </ScrollView>
            <BottomSheetModal ref={bottomSheetRef} snapPoints={snapPoints} onDismiss={() => setPressedBook(null)}>
                <ManageBookSheetBody book={pressedBook} />
            </BottomSheetModal>
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

export * from "./Book"