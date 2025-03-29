import React from "react";
import { Provider } from "react-redux"; 
import { store } from "../store/store"; 
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext"; 
import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  console.log("Renderizando RootLayout"); // Depuración del renderizado

  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Stack />
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}