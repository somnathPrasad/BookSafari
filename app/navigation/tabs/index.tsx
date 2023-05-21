import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { RouteProp } from "@react-navigation/native";
import { HomeScreen } from "../../features/Home/screens";
import { Ionicons } from '@expo/vector-icons';
import { SearchScreen } from "../../features/Search/screens";
import { SettingsScreen } from "../../features/Settings/screens";

export type TabParamListBase = {
    Home: undefined;
    Search: undefined;
    Settings: undefined;
}

const Tab = createBottomTabNavigator<TabParamListBase>();

export const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
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
        let iconName: keyof typeof Ionicons.glyphMap | undefined;

        if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
        } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'ios-search-outline';
        } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
        }

        // You can return any component that you like here!
        if (iconName) {
            return <Ionicons name={iconName} size={size} color={color} />;
        }
    },
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "gray",
    tabBarStyle: {
        backgroundColor: "#000000",
        borderTopWidth: 0,
    },
    tabBarShowLabel: false,
})
