import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function Index() {
    const router = useRouter();
    const { user } = useAuth();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    useEffect(() => {
        if (isMounted) {
            router.replace(user ? '/home' : '/login');
        }
    }, [isMounted])

    return (
        <View>
            <Text>Usuario: {user ? user.email : 'No autenticado'}</Text>
        </View>
    );
}
