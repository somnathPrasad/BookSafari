import { TextInput, View } from "react-native"
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from "react-native";
import { Dispatch, SetStateAction } from "react";

interface SearchInputProps {
    setSearchTerm: Dispatch<SetStateAction<string>>
}

export const Search = (props: SearchInputProps) => {
    return (
        <View style={{ borderWidth: 0.5 }} className="mt-10 bg-gray-600 border-neutral-400 rounded-xl py-3 pl-3 mx-5 flex-row">
            <Feather name="search" size={24} color="white" />
            <TextInput onChangeText={props.setSearchTerm} cursorColor={"#fff"} placeholder="Search books directly from Google" keyboardType="web-search" placeholderTextColor="#fff" style={styles.searchInput} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchInput: {
        color: "#fff",
        marginLeft: 10,
        fontSize: 20,
        flex: 1
    },
})