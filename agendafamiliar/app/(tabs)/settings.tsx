import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const styles = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {language === "es" ? "Configuraciones" : "Settings"}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleTheme}
      >
        <Text style={styles.buttonText}>
          {language === "es" ? "Cambiar Tema" : "Toggle Theme"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={toggleLanguage}
      >
        <Text style={styles.buttonText}>
          {language === "es" ? "Cambiar Idioma" : "Toggle Language"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
