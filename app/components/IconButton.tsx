import { View, TouchableHighlight, TouchableHighlightProps } from "react-native"

interface IconButtonProps extends TouchableHighlightProps {
    children: React.ReactNode,
    variant?: "Danger" | "Primary" | "Secondary"
}

export const IconButton = (props:IconButtonProps) => {
    const {className, children, variant, ...rest} = props;
    return (
        <TouchableHighlight className="flex-1" {...rest}>
            <View className={`border rounded-2xl border-white py-2 px-3 items-center justify-center ${className}`}>
                {children}
            </View>
        </TouchableHighlight>
    )
}