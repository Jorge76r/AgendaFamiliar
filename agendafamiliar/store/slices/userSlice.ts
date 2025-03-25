import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

const initialState: User = {
  name: "",
  email: "",
  password: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      return action.payload; // Registrar un nuevo usuario
    },
    logoutUser: () => {
      return { name: "", email: "", password: "" }; // Cerrar sesión del usuario
    },
    loginUser: (state, action: PayloadAction<{ email: string; password: string }>) => {
      if (state.email === action.payload.email && state.password === action.payload.password) {
        return state; // Las credenciales coinciden, el usuario permanece logueado
      } else {
        return initialState; // Si no coinciden, el estado vuelve al inicial (no logueado)
      }
    },
  },
});

export const { registerUser, logoutUser, loginUser } = userSlice.actions;
export default userSlice.reducer;