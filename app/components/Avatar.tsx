import { Image, View } from "react-native"
import { Feather } from '@expo/vector-icons';

interface AvatarProps {
    size?: number;
    source?: string | null;
    style?: any;
}

export const Avatar = ({ size, source, style, ...props }: AvatarProps) => {
    return (
        <View style={[{ width: size ?? 112, aspectRatio: 1 }, style]} className="rounded-full bg-gray-400 items-center justify-center border border-gray-700" {...props}>
            {source ? <Image source={{ uri: source }} style={{ width: size ?? 112, aspectRatio: 1 }} className="rounded-full" /> :
                <Feather name="user" size={48} color="black" />}
        </View>
    )
}