import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";
import axios from "axios";
import { setUsers } from "@/store/slices/usersSlice";
import { BASE_URL } from "@/config/api";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from 'react-redux';


export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const styles = theme === "dark" ? darkTheme : lightTheme;
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await axios.get(BASE_URL + "/api/usuarios");
            dispatch(setUsers(response.data))
        }
        catch (err: any) {
            console.log("Error de Axios: ", err.message);
            console.log("Error completo: ", err.toJSON?.());
            console.log("Axios URL: ", BASE_URL + "/api/usuarios");
            console.log("Response data: ", Response.call);
        }
    };
    fetchUsers();
}, [dispatch])

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
