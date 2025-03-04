import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, StyleSheet } from 'react-native';
import CustomInput from "../../components/CustomInput";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";

interface LoginScreenProps {
    onLogin: (email: string, password: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { theme } = useTheme();
    const { language } = useLanguage();
    const themeStyles = theme === "dark" ? darkTheme : lightTheme;

    const handleLogin = () => {
        if (!email || !password) {
            setError(language === "es" ? 'Por favor, complete todos los campos' : 'Please fill in all fields');
            return;
        }

        if (!email.endsWith('@gmail.com')) {
            setError(language === "es" ? 'Por favor, ingrese un correo electrónico válido' : 'Please enter a valid email');
            return;
        }

        if (password !== '1234') {
            setError(language === "es" ? 'La contraseña es 1234 ... no le digas a nadie' : 'The password is 1234 ... don\'t tell anyone');
            return;
        }

        setError('');
        setLoading(true);
        onLogin(email, password);
        setLoading(false);
    };

    return (
        <View style={themeStyles.container}>
            <View style={themeStyles.content}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <CustomInput
                    label={language === "es" ? "Correo Electrónico" : "Email"}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    validationRule={(text) => text.endsWith('@gmail.com')}
                    errorMessage={language === "es" ? "Correo inválido" : "Invalid email"}
                    style={themeStyles.input} // Aplica los estilos de entrada
                    labelStyle={themeStyles.text} // Aplica los estilos del label
                />
                <CustomInput 
                    label={language === "es" ? "Contraseña" : "Password"}
                    value={password}
                    keyboardType='numeric'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={themeStyles.input} // Aplica los estilos de entrada
                    labelStyle={themeStyles.text} // Aplica los estilos del label
                />

                {error ? <Text style={themeStyles.error}>{error}</Text> : null}

                {loading ? (
                    <ActivityIndicator size="large" color="#4A90E2" />
                ) : (
                    <TouchableOpacity style={themeStyles.button} onPress={handleLogin}>
                        <Text style={themeStyles.buttonText}>{language === "es" ? "Ingresar" : "Login"}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 200, // Ajusta el ancho del rectángulo
        height: 200, // Ajusta la altura del rectángulo
        marginBottom: 40,
        //borderRadius: 15, // Redondea los bordes de la imagen
        //borderWidth: 2, // Añade un borde a la imagen
        borderColor: 'gray', // Color del borde
        alignSelf: 'center', // Centrar la imagen horizontalmente
    },
});
