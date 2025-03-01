import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import CustomInput from "../../components/CustomInput";

interface LoginScreenProps {
    onLogin: (email: string, password: string) => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            setError('Por favor, complete todos los campos');
            return;
        }

        if (!email.endsWith('@gmail.com')) {
            setError('Por favor, ingrese un correo electrónico válido');
            return;
        }

        if (password !== '1234') {
            setError('La contraseña es 1234 ... no le digas a nadie');
            return;
        }

        setError('');
        setLoading(true);
        onLogin(email, password);
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <CustomInput
                    label="Correo Electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    validationRule={(text) => text.endsWith('@gmail.com')}
                    errorMessage="Correo inválido"
                />
                <CustomInput 
                    label="Contraseña"
                    value={password}
                    keyboardType='numeric'
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                {loading ? (
                    <ActivityIndicator size="large" color="#4A90E2" />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Ingresar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: 200, // Ajusta el ancho del rectángulo
        height: 100, // Ajusta la altura del rectángulo
        marginBottom: 40,
        borderRadius: 15, // Redondea los bordes de la imagen
        borderWidth: 2, // Añade un borde a la imagen
        borderColor: 'gray', // Color del borde
        alignSelf: 'center', // Centrar la imagen horizontalmente
    },
    content: {
        width: '100%',
    },
    error: {
        color: "red",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#4A90E2",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});
