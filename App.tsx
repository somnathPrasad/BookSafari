import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './app/lib';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico"
import * as SplashScreen from 'expo-splash-screen';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AppNavigation, AuthNavigation } from './app/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_800ExtraBold,
    Pacifico_400Regular
  });

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setLoggedIn(!!user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
    StatusBar.setBackgroundColor("rgba(0,0,0,0.2)");
    StatusBar.setTranslucent(true);

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !initializing) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || initializing) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          {loggedIn ? <AppNavigation /> : <AuthNavigation />}
        </NavigationContainer>
      </QueryClientProvider >
    </GestureHandlerRootView>
  );
}