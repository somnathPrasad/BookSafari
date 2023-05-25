import { TouchableHighlight, PressableProps, StyleSheet, Text, View, TouchableHighlightProps } from "react-native"
import { FontAwesome, AntDesign } from '@expo/vector-icons';

interface BottomSheetButtonProps extends TouchableHighlightProps {
    externalLink?: boolean,
    iconName?: keyof typeof AntDesign.glyphMap | undefined;
    iconComponent?: React.ReactNode;
    label: string,
    disabledLabel?: string,
    className?: string,
}

export const BottomSheetButton = (props: BottomSheetButtonProps) => {

    return (
        <TouchableHighlight onPress={props.onPress} className={`rounded-md px-3 my-2`} style={{ opacity: props.disabled ? 0.3 : 1 }}>
            <View className="flex-row items-center justify-between">
                <View className="flex-row">
                    {props.iconComponent ? props.iconComponent :
                        <AntDesign name={props.iconName} size={30} color="white" />}

                    {props.disabled && <Text style={styles.bookTitle} className="ml-2">{props.disabledLabel ?? props.label}</Text>}
                    {!props.disabled &&
                        <Text style={styles.bookTitle} className="ml-2">{props.label}</Text>}
                </View>
                {props.externalLink &&
                    <View style={{ opacity: 0.3 }}>
                        <FontAwesome name="external-link" size={20} color="white" />
                    </View>}
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        paddingHorizontal: 20,
        paddingBottom: 200,
        paddingTop: 20
    },
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