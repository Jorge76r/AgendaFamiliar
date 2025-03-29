import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import axios from "axios";
import { BASE_URL } from "@/config/api";

interface AgendarProps {
  onAddTask: (task: any) => void;
}

export default function Agendar({ onAddTask }: AgendarProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tipo, setTipo] = useState<"Medicamento" | "Cita Médica" | "Otros">("Medicamento");
  const [recurrencia, setRecurrencia] = useState<"Un solo día" | "Diario" | "Semanal" | "Mensual">(
    "Un solo día"
  );
  const [fechaHora, setFechaHora] = useState<Date | null>(null); // Fecha y hora seleccionadas
  const [tempDate, setTempDate] = useState<Date>(new Date()); // Fecha temporal seleccionada
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mostrar selector de fecha
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: tempDate,
      onChange: (_, selectedDate) => {
        if (selectedDate) {
          setTempDate(selectedDate);
          showTimePicker(); // Después de seleccionar la fecha, mostrar la hora
        }
      },
      mode: "date",
    });
  };

  // Mostrar selector de hora
  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: tempDate,
      onChange: (_, selectedTime) => {
        if (selectedTime) {
          const combinedDate = new Date(tempDate);
          combinedDate.setHours(selectedTime.getHours());
          combinedDate.setMinutes(selectedTime.getMinutes());
          setFechaHora(combinedDate);
        }
      },
      mode: "time",
    });
  };

  const handleSubmit = async () => {
    if (!title || !description || !fechaHora) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formattedFechaHora = fechaHora.toISOString(); // Convertir a ISO para el backend

      const response = await axios.post(`${BASE_URL}/api/agendar`, {
        title,
        description,
        tipo,
        fechaHora: formattedFechaHora,
        recurrencia,
      });

      if (response.status === 201 || response.status === 200) {
        const newTask = response.data;
        onAddTask(newTask); // Notificar a Home la nueva tarea
        Alert.alert("Éxito", "Tarea agendada correctamente.");
        setTitle("");
        setDescription("");
        setTipo("Medicamento");
        setRecurrencia("Un solo día");
        setFechaHora(null);
      } else {
        setError("No se pudo agendar la tarea.");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error al agendar tarea:", error.message);
        setError(`No se pudo conectar con el servidor. Intenta nuevamente. ${BASE_URL}`);
      } else {
        console.error("Error desconocido:", error);
        setError("Ha ocurrido un error inesperado.");
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Tipo de tarea:</Text>
        <Picker selectedValue={tipo} onValueChange={setTipo} style={styles.picker}>
          <Picker.Item label="Medicamento" value="Medicamento" />
          <Picker.Item label="Cita Médica" value="Cita Médica" />
          <Picker.Item label="Otros" value="Otros" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Recurrencia:</Text>
        <Picker selectedValue={recurrencia} onValueChange={setRecurrencia} style={styles.picker}>
          <Picker.Item label="Un solo día" value="Un solo día" />
          <Picker.Item label="Diario" value="Diario" />
          <Picker.Item label="Semanal" value="Semanal" />
          <Picker.Item label="Mensual" value="Mensual" />
        </Picker>
      </View>
      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
        <Text>
          {fechaHora
            ? fechaHora.toLocaleString("es-ES")
            : "Seleccionar Fecha y Hora"}
        </Text>
      </TouchableOpacity>
      {error ? <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Agendar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#F5F5F5",
  },
  pickerContainer: { borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  picker: { height: 50 },
  label: { fontSize: 16, marginBottom: 5 },
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
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
});