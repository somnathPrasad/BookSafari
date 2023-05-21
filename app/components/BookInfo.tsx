import { Text, View } from "react-native"
import { BookVolumeInfoType } from "../lib/types"
import { Image } from "react-native"
import { StyleSheet } from "react-native"

interface BookInfoProps {
    book?: BookVolumeInfoType | null
}

export const BookInfo = (props: BookInfoProps) => {
    const { book } = props;
    return (
        <View className="flex-row pb-5 border-b-slate-700 border-b">
            {book?.imageLinks?.thumbnail &&
                <Image resizeMode="cover" source={{ uri: book.imageLinks.thumbnail }} style={{ width: 100, height: 150 }} />}

            <View className="ml-3 flex-1">

                {book?.title && <Text style={styles.bookTitle}>{book.title}</Text>}

                {book?.subtitle && <Text style={styles.bookSubtitle}>{book.subtitle}</Text>}

                {book?.authors && book.authors.length > 0 &&
                    <Text style={styles.bookAuthors}>Author: {book.authors?.join(', ')}</Text>}

                {book?.averageRating && <Text style={styles.bookAuthors}>Ratings: {'⭐'.repeat(book.averageRating)}</Text>}

                {!!book?.pageCount && <Text style={styles.bookAuthors}>Pages: {book.pageCount}</Text>}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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