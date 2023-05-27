import { Text, View } from "react-native"
import { BookVolumeInfoType } from "../lib/types"
import { Image } from "react-native"
import { StyleSheet } from "react-native"
import { Chip } from "./Chip"

interface BookInfoProps {
    book?: BookVolumeInfoType | null,
    coverWidth?: number,
    showTitle?: boolean,
    subtitleClassName?: string
}

export const BookInfo = (props: BookInfoProps) => {
    const { book, showTitle = true } = props;
    return (
        <View className="flex-row pb-5">
            {book?.imageLinks?.thumbnail &&
                <Image resizeMode="cover" source={{ uri: book.imageLinks.thumbnail }} style={{ width: props.coverWidth ?? 100, aspectRatio: 0.66 }} />}

            <View className="ml-3 flex-1">

                {book?.title && showTitle && <Text style={styles.bookTitle}>{book.title}</Text>}

                {book?.subtitle && <Text className={`font-manropeSemiBold text-base mt-1 text-white ${props.subtitleClassName}`}>{book.subtitle}</Text>}

                {book?.authors && book.authors.length > 0 &&
                    <Text style={styles.bookAuthors}>Author: {book.authors?.join(', ')}</Text>}

                {book?.averageRating && <Text style={styles.bookAuthors}>Ratings: {'⭐'.repeat(book.averageRating)}</Text>}

                {!!book?.pageCount && <Text style={styles.bookAuthors}>Pages: {book.pageCount}</Text>}

                <View className="mt-4">
                    {book?.categories && book.categories.length > 0 && book.categories.map((category, index) => (<Chip key={index} label={category} />))}
                </View>

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