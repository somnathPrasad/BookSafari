import { StatusBar, StyleSheet } from "react-native";

export const theme = StyleSheet.create({
  screenContainer: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    paddingHorizontal: 20,
  },
  titleLarge:{
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    fontFamily:"Manrope_800ExtraBold"
  }
});
