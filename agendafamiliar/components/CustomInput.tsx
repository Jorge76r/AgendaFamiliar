import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

interface CustomInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address' | 'numeric';
    validationRule?: (text: string) => boolean;
    errorMessage?: string;
}

const CustomInput = ({ label, value, onChangeText, placeholder = '', secureTextEntry = false, keyboardType = 'default', validationRule, errorMessage }: CustomInputProps) => {
    const [isValid, setIsValid] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

    const handleOnChange = (text: string) => {
        onChangeText(text);
        if (validationRule) {
            setIsValid(validationRule(text));
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={[styles.input, !isValid && styles.inputError]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleOnChange}
                    secureTextEntry={!isPasswordVisible}
                    keyboardType={keyboardType}
                    placeholderTextColor="#999999"
                />
                {
                    secureTextEntry && (
                        <TouchableOpacity onPress={() => { setIsPasswordVisible(!isPasswordVisible); }}>
                            <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} />
                        </TouchableOpacity>
                    )
                }
            </View>
            {!isValid && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { margin: 15 },
    label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', width: '100%' },
    input: { flex: 1, height: 40, borderWidth: 1, borderColor: '#DDD', borderRadius: 5, paddingHorizontal: 10, backgroundColor: 'white' },
    inputError: { borderColor: 'red' },
    errorText: { color: 'red', marginTop: 5 },
    icon: { marginLeft: 10 },
});

export default CustomInput;
