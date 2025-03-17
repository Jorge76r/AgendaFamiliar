import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/agendarSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer, // Registrar el reducer de tareas
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
