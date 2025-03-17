import React from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext"; // Importar el proveedor de idiomas
import { Provider } from "react-redux"; // Importar Redux Provider
import { store } from "../store/store"; // Store de Redux
import { Stack } from "expo-router";

export default function RootLayout() {
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
