import React, { useState } from "react";
import {View, TextInput, TouchableOpacity, Alert, Text, StyleSheet} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from "react-redux"; // importado de Redux
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { addTask } from "../../store/slices/agendarSlice"; //Acción de Redux para agendar

export default function Agendar() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tipo, setTipo] = useState<"Medicamento" | "Cita Médica" | "Otros">("Medicamento");
  const [fechaHora, setFechaHora] = useState("");
  const [recurrencia, setRecurrencia] = useState<
"Un solo día" | "Diario" | "Semanal" | "Mensual">("Un solo día");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const dispatch = useDispatch(); //Declaración del dispatch
  const { language } = useLanguage(); // Idioma global
  const { theme } = useTheme(); 
  const styles = theme === "dark" ? darkStyles : lightStyles; // Estilos dinámicos basados en el tema

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (date: Date) => {
    setFechaHora(date.toISOString());
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (!title || !description || !fechaHora) {
      Alert.alert(
        language === "es" ? "Error" : "Error",
        language === "es"
          ? "Por favor, completa todos los campos."
          : "Please fill in all fields."
      );
      return;
    }

    dispatch(
      addTask({
        id: Date.now().toString(),
        title,
        description,
        tipo,
        fechaHora,
        recurrencia,
      })
    );

    Alert.alert(
      language === "es" ? "Éxito" : "Success",
      language === "es"
        ? "Tarea agendada correctamente."
        : "Task successfully scheduled."
    );

    setTitle("");
    setDescription("");
    setFechaHora("");
    setRecurrencia("Un solo día");
  };

  return (
    <View style={styles.container}>
      {/* Campo para el título */}
      <TextInput
        style={styles.input}
        placeholder={language === "es" ? "Título" : "Title"}
        value={title}
        onChangeText={setTitle}
      />

      {/* Campo para la descripción */}
      <TextInput
        style={styles.input}
        placeholder={language === "es" ? "Descripción" : "Description"}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Selector del tipo de tarea */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(value) => setTipo(value)}
          style={styles.picker}
        >
          <Picker.Item
            label={language === "es" ? "Medicamento" : "Medication"}
            value="Medicamento"
          />
          <Picker.Item
            label={
              language === "es"
                ? "Cita Médica"
                : "Doctor's Appointment"
            }
            value="Cita Médica"
          />
          <Picker.Item
            label={language === "es" ? "Otros" : "Others"}
            value="Otros"
          />
        </Picker>
      </View>

      {/* Selector de recurrencia */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={recurrencia}
          onValueChange={(value) => setRecurrencia(value)}
          style={styles.picker}
        >
          <Picker.Item
            label={language === "es" ? "Un solo día" : "One-time"}
            value="Un solo día"
          />
          <Picker.Item
            label={language === "es" ? "Diario" : "Daily"}
            value="Diario"
          />
          <Picker.Item
            label={language === "es" ? "Semanalmente" : "Weekly"}
            value="Semanal"
          />
          <Picker.Item
            label={language === "es" ? "Mensualmente" : "Monthly"}
            value="Mensual"
          />
        </Picker>
      </View>

      {/* Botón para seleccionar fecha y hora */}
      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
        <Text>
          {fechaHora
            ? new Date(fechaHora).toLocaleString(
                language === "es" ? "es-ES" : "en-US"
              )
            : language === "es"
            ? "Seleccionar Fecha y Hora"
            : "Select Date and Time"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Botón para enviar */}
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>
          {language === "es" ? "Agendar" : "Schedule"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const lightStyles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#FFFFFF" },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#F5F5F5" },
  pickerContainer: { borderWidth: 1, borderRadius: 5, marginBottom: 10, backgroundColor: "#FFFFFF" },
  picker: { height: 50 },
  datePicker: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});

const darkStyles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#1E1E1E" },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10, backgroundColor: "#333" },
  pickerContainer: { borderWidth: 1, borderRadius: 5, marginBottom: 10, backgroundColor: "#333" },
  picker: { height: 50, color: "#FFF" },
  datePicker: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#555",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#000000", fontSize: 16, fontWeight: "bold" },
});
