import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    StyleSheet,
    Alert
} from 'react-native';
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

    const handleLogin = async () => {
        if (!email || !password) {
            setError(language === "es" ? 'Por favor, complete todos los campos' : 'Please fill in all fields');
            return;
        }

        setError('');
        setLoading(true);

        try {
            //Aqui colocar la ip local, no funciona con localhost
            const response = await fetch('http://192.168.1.48:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Inicio de sesión exitoso:', data);

                onLogin(email, password);
            } else if (response.status === 401) {
                setError(language === "es" ? 'Credenciales inválidas' : 'Invalid credentials');
            } else {
                setError(language === "es" ? 'Error en el servidor, inténtelo más tarde' : 'Server error, please try again later');
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            setError(language === "es" ? 'Error al conectar con el servidor' : 'Error connecting to the server');
        }

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
                    style={themeStyles.input}
                    labelStyle={themeStyles.text}
                />

                <CustomInput
                    label={language === "es" ? "Contraseña" : "Password"}
                    value={password}
                    onChangeText={setPassword}
                    keyboardType="numeric"
                    secureTextEntry={true}
                    style={themeStyles.input}
                    labelStyle={themeStyles.text}
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
        width: 200,
        height: 200,
       // marginBottom: 40,
        alignSelf: 'center',
    },
});
