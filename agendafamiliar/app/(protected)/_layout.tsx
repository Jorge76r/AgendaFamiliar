import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { View, StyleSheet } from 'react-native';

export default function ProtectedLayout() {
    const { isAllowed } = useAuth(); // Verifica el estado de autenticación
    const { theme } = useTheme(); // Obtén el tema actual
    const { language } = useLanguage(); // Obtén el idioma actual
    const themeStyles = theme === "dark" ? darkTheme : lightTheme; // Define estilos dinámicos

    // Redirige al login si el usuario no está autenticado
    if (!isAllowed) return <Redirect href="/login" />;

    // Renderiza el diseño protegido
    return (
        <View style={[styles.container, themeStyles.container]}>
            <Stack />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
