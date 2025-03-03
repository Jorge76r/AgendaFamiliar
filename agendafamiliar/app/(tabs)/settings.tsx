import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const styles = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Modo Actual: {theme === "dark" ? "Oscuro" : "Claro"}
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Cambiar Tema</Text>
      </TouchableOpacity>
      
      <Text style={styles.text}>
        Idioma Actual: {language === "es" ? "Español" : "Inglés"}
      </Text>
      <TouchableOpacity style={styles.button} onPress={toggleLanguage}>
        <Text style={styles.buttonText}>
          {language === "es" ? "Switch to English" : "Cambiar a Español"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
