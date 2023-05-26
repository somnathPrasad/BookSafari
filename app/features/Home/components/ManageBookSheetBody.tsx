import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import { BookType } from "../../../lib/types"
import { Linking, StyleSheet, View } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth, firestore } from "../../../lib";
import { COLLECTION } from "../../../constants";
import RNFirestore from "@react-native-firebase/firestore"
import Toast from 'react-native-root-toast';
import { Book } from "./Book";
import { IconButton } from "../../../components";
import { AntDesign } from '@expo/vector-icons';

interface ManageBookSheetBodyProps {
    book: BookType | null
}

export const ManageBookSheetBody = (props: ManageBookSheetBodyProps) => {
    const { book } = props;
    const user = auth.currentUser;

    const removeBookFromBookshelf = async () => {
        const path = `${COLLECTION.BOOKSHELF}/${user?.uid}`;
        await firestore.doc(path).update({
            books: RNFirestore.FieldValue.arrayRemove(book)
        })
        Toast.show("Book removed from your bookshelf");
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
                    <IconButton onPress={removeBookFromBookshelf} className="border-red-500">
                        <MaterialCommunityIcons name="book-remove" size={30} color="red" />
                    </IconButton>
                    <IconButton onPress={handleAmazonPress}>
                        <AntDesign name={"amazon"} size={30} color={"white"} />
                    </IconButton>
                    <IconButton onPress={handleGooglePress}>
                        <AntDesign name={"google"} size={30} color={"white"} />
                    </IconButton>
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