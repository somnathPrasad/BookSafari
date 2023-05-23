import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RouteProp } from "@react-navigation/native";
import { HomeScreen } from "../../features/Home/screens";
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { SearchScreen } from "../../features/Search/screens";
import { SettingsScreen } from "../../features/Settings/screens";
import { ProfileScreen } from "../../features/Profile/screens";

export type TabParamListBase = {
    Shelf: undefined;
    Search: undefined;
    Settings: undefined;
    Profile: undefined;
}

const Tab = createBottomTabNavigator<TabParamListBase>();

export const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Shelf" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}

const screenOptions: BottomTabNavigationOptions | ((props: {
    route: RouteProp<TabParamListBase, keyof TabParamListBase>;
    navigation: any;
}) => BottomTabNavigationOptions) | undefined = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
        // let iconName: keyof typeof Ionicons.glyphMap | undefined;

        if (route.name === "Shelf") {
            return <MaterialCommunityIcons name="bookshelf" size={size} color={color} />
        } else if (route.name === 'Search') {
            return <Ionicons name='search' size={size} color={color} />
        } else if (route.name === "Settings") {
            return <Ionicons name="settings-outline" size={size} color={color} />
        } else if (route.name === "Profile") {
            return <Feather name="user" size={size} color={color} />
        }
    },
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
        backgroundColor: "#000000",
        borderTopWidth: 0,
        paddingTop:10
    },
    // tabBarShowLabel: false,
})
