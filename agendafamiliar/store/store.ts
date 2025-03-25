import { configureStore } from "@reduxjs/toolkit";
import agendarReducer from "./slices/agendarSlice"; // Importa correctamente el reducer de agendar
import userReducer from "./slices/userSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    agendar: agendarReducer, 
    user: userReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;