import { TextInput as RNTextInput, View, ViewProps, KeyboardTypeOptions } from "react-native"
import { Feather } from '@expo/vector-icons';
import { StyleSheet } from "react-native";

interface TextInputProps extends ViewProps {
    onChangeText: ((text: string) => void) | undefined;
    placeholder?: string;
    iconName?: keyof typeof Feather.glyphMap | undefined;
    iconSize?: number;
    iconColor?: string;
    keyboardType?: KeyboardTypeOptions | undefined
}

export const TextInput = (props: TextInputProps) => {
    return (
        <View style={{ borderWidth: 0.5 }} className={`bg-gray-600 border-neutral-400 rounded-xl py-3 pl-3 mx-5 flex-row ${props.className}`}>

            {props.iconName && 
            <Feather name={props.iconName} size={props.iconSize ?? 24} color={props.iconColor ?? "white"} />}

            <RNTextInput keyboardType={props.keyboardType} onChangeText={props.onChangeText} cursorColor={"#fff"} placeholder={props.placeholder} placeholderTextColor="#fff" style={styles.searchInput} />

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