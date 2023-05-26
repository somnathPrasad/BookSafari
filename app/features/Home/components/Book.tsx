import { Image, Text, View, StyleSheet, ViewProps, Dimensions } from "react-native";
import { BookVolumeInfoType } from "../../../lib/types";
import { TouchableHighlight } from "react-native-gesture-handler";
import { GestureResponderEvent } from "react-native";

interface BookInfoProps extends ViewProps {
    book?: BookVolumeInfoType | null,
    onLongPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined,
}

const { width } = Dimensions.get("window");

export const Book = (props: BookInfoProps) => {
    const { book } = props;
    return (
        <TouchableHighlight underlayColor={"transparent"} onLongPress={props.onLongPress}>
            <View className={`flex-row pb-3 px-5 ${props.className}`}>
                {book?.imageLinks?.thumbnail &&
                    <Image resizeMode="cover" source={{ uri: book.imageLinks.thumbnail }} style={{ width: 100, height: 150 }} />}

                <View className="ml-3 items-start flex-wrap">

                    {book?.title && <View className="flex-row justify-between">
                        <Text style={[styles.bookTitle]}>{book.title}</Text>
                    </View>}

                    {book?.authors && book.authors.length > 0 &&
                        <Text style={styles.bookAuthors}>Author{book.authors.length > 1 && "s"}: {book.authors?.join(', ')}</Text>}

                    {!!book?.pageCount && <Text style={styles.bookAuthors}>{book.pageCount} pages</Text>}

                </View>
            </View>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
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