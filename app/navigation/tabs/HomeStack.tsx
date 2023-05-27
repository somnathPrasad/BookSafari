import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BookType } from "../../lib/types";
import { HomeScreen, BookScreen } from "../../features/Home/screens";

export type HomeStackParamList = {
    Home: undefined;
    Book: { book: BookType };
}

const Stack = createNativeStackNavigator<HomeStackParamList>();

export const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Book" component={BookScreen} />
        </Stack.Navigator>
    )
}