import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  access_token: null,
  notification: {show: false, message: null},
  alert: {show: false, title: null, text: null, icon: null, showConfirmButton: true, confirmButtonText: null, onConfirmClick: null},
  category: {isDeleted: false, isEdited: false, isCreated: false},
  features: {},
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserToken: (state, action) => {
      state.access_token = action.payload.access_token
    },
    unSetUserToken: (state, action) => {
      state.access_token = action.payload.access_token
    },
    handleNotification: (state, action) => {
      state.notification = action.payload
    },
    handleAlert: (state, action) => {
      state.alert = action.payload
    },
    setCategory: (state, action) => {
      state.category = {
        ...state.category,
        ...action.payload
      };
    },    
  },
});

export const { setMode, setUserToken, unSetUserToken, handleNotification, handleAlert, setCategory } = globalSlice.actions;

export default globalSlice.reducer;
