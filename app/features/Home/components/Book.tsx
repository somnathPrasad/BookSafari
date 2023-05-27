import { Image, Text, View, StyleSheet, ViewProps, Dimensions } from "react-native";
import { BookType, BookVolumeInfoType } from "../../../lib/types";
import { TouchableHighlight } from "react-native-gesture-handler";
import { GestureResponderEvent } from "react-native";
import { Chip } from "../../../components";

interface BookInfoProps extends ViewProps {
    book?: BookType | null,
    onLongPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined,
    onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined
}

const { width } = Dimensions.get("window");

export const Book = (props: BookInfoProps) => {
    const { book } = props;
    const volumeInfo = book?.volumeInfo;
    return (
        <TouchableHighlight onPress={props.onPress} underlayColor={"transparent"} onLongPress={props.onLongPress}>
            <View className={`flex-row pb-3 px-5 ${props.className}`}>
                {volumeInfo?.imageLinks?.thumbnail &&
                    <Image resizeMode="cover" source={{ uri: volumeInfo.imageLinks.thumbnail }} style={{ width: 100, height: 150 }} />}

                <View className="ml-3 items-start flex-wrap">

                    {volumeInfo?.title && <View className="flex-row justify-between">
                        <Text style={[styles.bookTitle]}>{volumeInfo.title}</Text>
                    </View>}

                    {volumeInfo?.authors && volumeInfo.authors.length > 0 &&
                        <Text style={styles.bookAuthors}>Author{volumeInfo.authors.length > 1 && "s"}: {volumeInfo.authors?.join(', ')}</Text>}

                    {!!volumeInfo?.pageCount && <Text style={styles.bookAuthors}>{volumeInfo.pageCount} pages</Text>}

                    <View className="mt-4">
                        {book?.read && <Chip label="Completed" />}
                    </View>

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