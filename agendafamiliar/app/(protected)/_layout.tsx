import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import { View, StyleSheet } from 'react-native';

export default function ProtectedLayout() {
    const { isAllowed } = useAuth();
    const { theme } = useTheme();
    const { language } = useLanguage();
    const themeStyles = theme === "dark" ? darkTheme : lightTheme;

    if (!isAllowed) return <Redirect href="/login" />

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
