import { LinearGradient } from "expo-linear-gradient"
import { View, Text, FlatList } from "react-native"
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
            <Text style={[theme.titleLarge, { marginTop: 16, marginLeft: 20 }]}>Search</Text>
            <Search setSearchTerm={setSearchTerm} />
            <SearchResults books={books} isLoading={isLoading} />
        </LinearGradient>
    )
}