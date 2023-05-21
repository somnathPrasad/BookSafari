import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { BookType } from "../../../lib/types"
import { Pressable, StyleSheet, Text, View, Linking } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { BookInfo } from "../../../components/BookInfo";
import { useEffect, useState } from "react";
import { FontAwesome } from '@expo/vector-icons';
// import { useDatabase } from "../../../hooks";
import { BottomSheetButton } from "./BottomSheetButton";

interface SearchItemBottomSheetBodyProps {
    pressedBook: BookType | null
}

export const SearchItemBottomSheetBody = (props: SearchItemBottomSheetBodyProps) => {
    const { pressedBook } = props;
    if (!pressedBook) return null;
    if (!pressedBook.volumeInfo) return null;
    const book = pressedBook.volumeInfo;
    const id = pressedBook.id;
    const [isBookInBookShelf, setIsBookInBookShelf] = useState<boolean>(false);
    // const { addBook, books } = useDatabase();

    useEffect(() => {
        const checkIfBookIsInBookShelf = async () => {
            // if (books.length > 0) {
            //     const bookIds = books.map((book: BookType) => book.id);
            //     setIsBookInBookShelf(bookIds.includes(id));
            // }
        }
        checkIfBookIsInBookShelf();
    }, [id])

    const handleGooglePress = () => {
        if (book?.previewLink) Linking.openURL(book?.previewLink);
    }

    const handleAmazonPress = () => {
        Linking.openURL(`https://www.amazon.com/s?k=${book?.title} book`);
    }

    // const handleBookshelfPress = () => addBook(pressedBook);
    const handleBookshelfPress = () => {};


    return (
        <BottomSheetScrollView contentContainerStyle={styles.containerStyle}>
            <BookInfo book={book} />

            <View className="pb-5 justify-center mt-1">

                <BottomSheetButton onPress={handleBookshelfPress} disabled={isBookInBookShelf} label="Add this book to your bookshelf" disabledLabel="Book is already in your bookshelf" iconComponent={<MaterialCommunityIcons name="bookshelf" size={30} color="white" />} />
                
                <BottomSheetButton onPress={handleAmazonPress} label="Buy book on amazon" iconName="amazon" externalLink />

                {book?.previewLink && <BottomSheetButton onPress={handleGooglePress} label="Read book" iconName="google" externalLink />}

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