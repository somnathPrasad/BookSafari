import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react"
import { BookType } from "../../../lib/types"
import { ActivityIndicator, FlatList, Pressable, View } from "react-native"
import { BookInfo } from "../../../components"
import BottomSheet from '@gorhom/bottom-sheet';
import { SearchItemBottomSheetBody } from "./SearchItemBottomSheetBody"
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types"

interface SearchResultsProps {
    isLoading: boolean,
    books: {
        items: BookType[]
    },
    // onPress: () => void,
    // setPressedBook: Dispatch<SetStateAction<BookType | null>>
}

export const SearchResults = (props: SearchResultsProps) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['90%'], []);
    const [pressedBook, setPressedBook] = useState<BookType | null>(null);

    return (
        <View className="mt-10">
            {props.isLoading ? <ActivityIndicator size={"large"} color={"#fff"} /> :
                <FlatList
                    data={props.books?.items}
                    keyExtractor={item => item.id}
                    renderItem={({ item }: { item: BookType }) => <RenderSearchItems setPressedBook={setPressedBook} item={item} bottomSheetRef={bottomSheetRef} />}
                    ItemSeparatorComponent={() => <View style={{height:0.5}} className="bg-gray-700 w-96 self-center" />}
                    contentContainerStyle={{ paddingBottom: 200 }}
                />
            }
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                backgroundStyle={{ backgroundColor: "#000" }}
                handleIndicatorStyle={{ backgroundColor: "#fff", width: 80, height: 5 }}
            >
                <SearchItemBottomSheetBody pressedBook={pressedBook} />
            </BottomSheet>
        </View>
    )
}

interface RenderSearchItemsProps {
    item: BookType,
    bottomSheetRef: React.RefObject<BottomSheetMethods>,
    setPressedBook: Dispatch<SetStateAction<BookType | null>>
}

const RenderSearchItems = ({ item, bottomSheetRef, setPressedBook }: RenderSearchItemsProps) => {

    const openSheet = () => bottomSheetRef.current?.expand(); // expands to full height
    if (!item?.volumeInfo) {
        return null;
    }
    const book = item.volumeInfo;
    return (
        <Pressable className="my-3 px-5" onPress={() => {
            setPressedBook(item);
            openSheet();
        }}>
            <BookInfo book={book} />
        </Pressable>
    )
}