import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fillAuth: (state, { payload }) => {
      console.log(payload);
      if (payload.user) {
        const { email, username, isAdmin, firstName, lastName } = payload.user;
        state.currentUser = { email, username, isAdmin, firstName, lastName };
      } else {
        // sign-up isleminde user bilgisi 'payload.data' olarak gelir
        const { email, username, isAdmin, firstName, lastName } = payload.data;
        state.currentUser = { email, username, isAdmin, firstName, lastName };
      }
      state.token = payload.token;
    },

    cleanAuth: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { fillAuth, cleanAuth } = authSlice.actions; //recuderi export ediyoruz.

export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthToken = (state) => state.auth.token;

export default authSlice.reducer;
