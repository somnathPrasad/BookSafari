import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { BookType } from "../../../lib/types"
import { Linking, StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Book } from "./Book";
import { IconButton } from "../../../components";
import { AntDesign } from '@expo/vector-icons';
import firebase from "../../../lib/firebase";

interface ManageBookSheetBodyProps {
    book: BookType | null
}

export const ManageBookSheetBody = (props: ManageBookSheetBodyProps) => {
    const { book } = props;

    const removeBookFromBookshelf = async () => {
        await firebase.removeBookFromBookshelf(book);
    }

    const handleGooglePress = () => {
        if (book?.volumeInfo?.previewLink) Linking.openURL(book?.volumeInfo?.previewLink);
    }

    const handleAmazonPress = () => {
        Linking.openURL(`https://www.amazon.com/s?k=${book?.volumeInfo?.title} book`);
    }

    return (
        <BottomSheetScrollView contentContainerStyle={styles.containerStyle}>
            <View className="pb-5 justify-center mt-1">

                <Book book={book?.volumeInfo} />

                <View className="flex-row gap-3 mt-3">
                    <IconButton onPress={removeBookFromBookshelf} className="bg-zinc-800 border-zinc-900">
                        <MaterialCommunityIcons name="book-remove" size={30} color="red" />
                    </IconButton>
                    <IconButton onPress={handleAmazonPress} className="bg-zinc-800 border-zinc-900">
                        <AntDesign name={"amazon"} size={30} color={"white"} />
                    </IconButton>
                    <IconButton onPress={handleGooglePress} className="bg-zinc-800 border-zinc-900">
                        <AntDesign name={"google"} size={30} color={"white"} />
                    </IconButton>
                </View>

                <View className="mt-3">
                    <TouchableHighlight>
                        <View className="flex-row items-center bg-zinc-800 border-zinc-900 px-3 py-3 rounded-lg">
                            <MaterialCommunityIcons name="book-check" size={30} color="#4ade80" />
                            <Text className="font-manropeSemiBold text-green-400 text-xl ml-2">Mark this book as read</Text>
                        </View>
                    </TouchableHighlight>
                </View>

            </View>
        </BottomSheetScrollView>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingHorizontal: 20,
        paddingBottom: 200,
        paddingTop: 20
    },
    bookTitle: {
        fontFamily: "Manrope_600SemiBold",
        fontSize: 20,
        color: "#fff",
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
        marginTop: 4
    }
})