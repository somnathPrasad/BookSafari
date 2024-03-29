import { TouchableHighlight, TouchableHighlightProps, StyleSheet, View, Text, ActivityIndicator } from "react-native"

interface ButtonProps extends TouchableHighlightProps {
    title: string;
    textClassName?: string;
    loading?: boolean;
}

export const Button = (props: ButtonProps) => {

    return (
        <TouchableHighlight className={`rounded-3xl items-center bg-slate-300 ${props.className}`} {...props}>
            <View style={styles.button}>
                {props.loading ? <ActivityIndicator color={"#000"} /> :
                    <Text className={`px-5 text-xl font-manropeSemiBold ${props.textClassName}`}>{props.title}</Text>}
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 24
    },
});