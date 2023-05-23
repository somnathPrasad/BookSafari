/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manropeRegular: ["Manrope_400Regular"],
        manropeMedium: ["Manrope_500Medium"],
        manropeSemiBold: ["Manrope_600SemiBold"],
        manropeExtraBold: ["Manrope_800ExtraBold"],
        pacifico: ["Pacifico_400Regular"],
      },
    },
  },
  plugins: [],
}

