import { StyleSheet } from "react-native";

export const lightTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: '100%',
  },
  text: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
    textAlign: "center",
  },
  input: {
    borderColor: "#000000", // Color del borde para el tema claro
    color: "#000000", // Color del texto para el tema claro
    width: '100%', // Ajuste para ocupar el ancho completo de la pantalla
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF", // Fondo blanco para los inputs
  },
  inputText: {
    color: "#000000", // Aseguramos que el color del texto en el input se mantenga negro
  },
  error: {
    color: "red", // Color del texto de error para el tema claro
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  linkText: { marginTop: 10, color: "#007bff", textDecorationLine: "underline" },
  button: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center", // Aseguramos que el botón esté centrado
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export const darkTheme = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: '100%',
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FFFFFF",
    textAlign: "center",
  },
  input: {
    borderColor: "#FFFFFF", // Color del borde para el tema oscuro
    color: "#000000", // Color del texto para el tema oscuro (asegurando que siempre sea negro)
    width: '100%', // Ajuste para ocupar el ancho completo de la pantalla
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#FFFFFF", // Fondo blanco para los inputs
  },
  inputText: {
    color: "#000000", // Aseguramos que el color del texto en el input se mantenga negro
  },
  error: {
    color: "red", // Color del texto de error para el tema oscuro
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  linkText: { marginTop: 10, color: "#007bff", textDecorationLine: "underline" },
  button: {
    backgroundColor: "#1abc9c",
    padding: 12,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center", // Aseguramos que el botón esté centrado
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
