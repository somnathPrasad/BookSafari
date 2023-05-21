import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './app/navigation/tabs';
import { useCallback, useEffect } from 'react';
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
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './app/context';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_800ExtraBold
  });

  useEffect(() => {
    StatusBar.setBarStyle("light-content");
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </AuthProvider>
      </QueryClientProvider >
    </GestureHandlerRootView>
  );
}