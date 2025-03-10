import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface AgendarProps {
  onAddTask: (
    title: string,
    description: string,
    tipo: string,
    fechaHora: string,
    recurrencia: string
  ) => void;
}

export default function Agendar({ onAddTask }: AgendarProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tipo, setTipo] = useState<"Medicamento" | "Cita Médica" | "Otros">("Medicamento");
  const [fechaHora, setFechaHora] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [recurrencia, setRecurrencia] = useState<"Un solo día" | "Diario" | "Semanal" | "Mensual">("Un solo día");

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (date: Date) => {
    setFechaHora(date.toISOString()); // Almacena la fecha en formato estándar ISO
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (!title || !description || !fechaHora) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    // Llamar a la función `onAddTask` para agregar una nueva tarea
    onAddTask(title, description, tipo, fechaHora, recurrencia);

    // Restablecer los valores después de enviar
    setTitle("");
    setDescription("");
    setFechaHora("");
    setRecurrencia("Un solo día");

    Alert.alert("Éxito", "Tarea agendada correctamente.");
  };

  return (
    <View style={styles.container}>
      {/* Campo para el título */}
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      
      {/* Campo para la descripción */}
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Picker para el tipo de tarea */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(value) => setTipo(value)}
          style={styles.picker}
        >
          <Picker.Item label="Medicamento" value="Medicamento" />
          <Picker.Item label="Cita Médica" value="Cita Médica" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
      </View>

      {/* Picker para la recurrencia */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={recurrencia}
          onValueChange={(value) => setRecurrencia(value)}
          style={styles.picker}
        >
          <Picker.Item label="Un solo día" value="Un solo día" />
          <Picker.Item label="Diario" value="Diario" />
          <Picker.Item label="Semanal" value="Semanal" />
          <Picker.Item label="Mensual" value="Mensual" />
        </Picker>
      </View>

      {/* Botón para seleccionar fecha y hora */}
      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
        <Text>{fechaHora ? new Date(fechaHora).toLocaleString("es-ES") : "Seleccionar Fecha y Hora"}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {/* Botón para enviar */}
      <Button title="Agendar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
  pickerContainer: { borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  picker: { height: 50 },
  datePicker: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 10 },
});
