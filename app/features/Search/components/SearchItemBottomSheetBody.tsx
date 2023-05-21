import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { BookType } from "../../../lib/types"
import { StyleSheet, View, Linking } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BookInfo } from "../../../components/BookInfo";
import { useState } from "react";
import { BottomSheetButton } from "./BottomSheetButton";
import { AuthModal } from "../../../components";
import { useAuth } from "../../../hooks";
import { firestore } from "../../../lib";
import RNFirestore from "@react-native-firebase/firestore"
import { COLLECTION } from "../../../constants";

interface SearchItemBottomSheetBodyProps {
    pressedBook: BookType | null
}

export const SearchItemBottomSheetBody = (props: SearchItemBottomSheetBodyProps) => {
    const { pressedBook } = props;


    if (!pressedBook) return null;
    if (!pressedBook.volumeInfo) return null;
    const book = pressedBook.volumeInfo;
    const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
    const { user } = useAuth();

    const handleGooglePress = () => {
        if (book?.previewLink) Linking.openURL(book?.previewLink);
    }

    const handleAmazonPress = () => {
        Linking.openURL(`https://www.amazon.com/s?k=${book?.title} book`);
    }

    const handleBookshelfPress = async () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }
        const docPath = `${COLLECTION.BOOKSHELF}/${user.uid}`;
        await firestore.doc(docPath).update({
            books: RNFirestore.FieldValue.arrayUnion(pressedBook.id)
        });
    };


    return (
        <BottomSheetScrollView contentContainerStyle={styles.containerStyle}>
            <BookInfo book={book} />

            <View className="pb-5 justify-center mt-1">

                <BottomSheetButton onPress={handleBookshelfPress} label="Add this book to your bookshelf" disabledLabel="Book is already in your bookshelf" iconComponent={<MaterialCommunityIcons name="bookshelf" size={30} color="white" />} />

                <BottomSheetButton onPress={handleAmazonPress} label="Buy book on amazon" iconName="amazon" externalLink />

                {book?.previewLink && <BottomSheetButton onPress={handleGooglePress} label="Read book" iconName="google" externalLink />}

            </View>
            <AuthModal visible={showAuthModal} onRequestClose={() => setShowAuthModal(false)} />

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