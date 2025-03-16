import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TasksProvider } from "@/contexts/TasksContext"; 
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthProvider>
                    <TasksProvider>
                        <Stack />
                    </TasksProvider>
                </AuthProvider>
            </LanguageProvider>
        </ThemeProvider>
    );
}
