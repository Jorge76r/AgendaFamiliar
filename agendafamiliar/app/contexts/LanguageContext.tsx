// contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Language = "es" | "en";

interface LanguageContextProps {
    language: Language;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage debe usarse dentro de LanguageProvider");
    return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>("es");

    useEffect(() => {
        const loadLanguage = async () => {
            const savedLanguage = await AsyncStorage.getItem("language");
            if (savedLanguage) {
                setLanguage(savedLanguage as Language);
            }
        };
        loadLanguage();
    }, []);

    const toggleLanguage = async () => {
        const newLanguage = language === "es" ? "en" : "es";
        setLanguage(newLanguage);
        await AsyncStorage.setItem("language", newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageContext;
