import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <Stack />
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
