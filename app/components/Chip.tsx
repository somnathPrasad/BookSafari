import { Text, TextProps, View, ViewProps } from "react-native"

interface ChipProps extends ViewProps {
    label: string
    textClassName?: TextProps["className"]
}

export const Chip = (props: ChipProps) => {
    return (
        <View className={`items-center justify-center px-3 py-1 rounded-full bg-gray-200 ${props.className}`}>
            <Text className={`font-manropeSemiBold ${props.textClassName}`}>{props.label}</Text>
        </View>
    )
}