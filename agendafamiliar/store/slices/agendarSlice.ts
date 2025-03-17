import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
  tipo: string;
  fechaHora: string;
  recurrencia: string;
}

const initialState: Task[] = [];

const agendarSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload); // Agregar nueva tarea al estado
    },
  },
});

export const { addTask } = agendarSlice.actions;
export default agendarSlice.reducer;
