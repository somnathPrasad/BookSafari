import { LinearGradient } from "expo-linear-gradient"
import { View, Text, StyleSheet, StatusBar } from "react-native"
import { LinearGradientColors } from "../../../constants/colors"
import { theme } from "../../../style"
import { Search, SearchResults } from "../components"
import { useState } from "react"
import { useDebounce } from "../../../hooks"
import { useSearchBooks } from "../api"

export const SearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: books, isLoading } = useSearchBooks(debouncedSearchTerm);
    return (
        <LinearGradient style={[theme.screenContainer, { paddingHorizontal: 0 }]} colors={LinearGradientColors}>
            <View className="px-5" style={{ paddingTop: StatusBar.currentHeight }}>
                <Text style={styles.text} className="font-manropeExtraBold text-2xl pt-4">Search</Text>
            </View>
            <Search setSearchTerm={setSearchTerm} />
            <SearchResults books={books} isLoading={isLoading} />
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