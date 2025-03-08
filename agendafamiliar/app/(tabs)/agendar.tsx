import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface AgendarProps {
  onAddTask: (title: string, description: string, tipo: string, fechaHora: string) => void;
}

export default function Agendar({ onAddTask }: AgendarProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tipo, setTipo] = useState<'Medicamento' | 'Cita Médica'>('Medicamento');
  const [fechaHora, setFechaHora] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleDateConfirm = (date: Date) => {
    setFechaHora(date.toLocaleString('es-ES', { hour12: false }));
    hideDatePicker();
  };

  const handleSubmit = () => {
    if (!title || !description || !fechaHora) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }
    onAddTask(title, description, tipo, fechaHora);
    setTitle('');
    setDescription('');
    setFechaHora('');
    Alert.alert('Éxito', 'Tarea agendada correctamente');
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Descripción" value={description} onChangeText={setDescription} multiline />
      <View style={styles.pickerContainer}>
        <Picker selectedValue={tipo} onValueChange={(value) => setTipo(value)} style={styles.picker}>
          <Picker.Item label="Medicamento" value="Medicamento" />
          <Picker.Item label="Cita Médica" value="Cita Médica" />
        </Picker>
      </View>
      <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
        <Text>{fechaHora || "Seleccionar Fecha y Hora"}</Text>
      </TouchableOpacity>
      <DateTimePickerModal isVisible={isDatePickerVisible} mode="datetime" onConfirm={handleDateConfirm} onCancel={hideDatePicker} />
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
