import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout: React.FC = () => {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: keyof typeof Ionicons.glyphMap;

                    if (route.name === "home") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "anadirtarea") {
                        iconName = focused ? "add-circle" : "add-circle-outline";
                    } else if (route.name === "settings") {
                        iconName = focused ? "settings" : "settings-outline";
                    } else {
                        iconName = "alert"; // Valor por defecto para evitar errores
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "blue",
                tabBarInactiveTintColor: "gray",
                headerShown: false,
            })}
        />
    );
};

export default TabsLayout;
