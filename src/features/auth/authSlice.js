import { api } from '../../app/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchData = createAsyncThunk(
  'auth/fetchData',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        '/login',
        {
          username: username,
          password: password,
        },
        { headers: { Authorization: localStorage.getItem('jwtToken') } },
      );

      //Если в ответе сервера есть ключ token, значит успех
      if (response.data.hasOwnProperty('token')) {
        //Если авторизация прошла успешно
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: {
      failed: false,
      message: null,
    },
    token: null,
    username: null,
    role: null,
    name: null,
    surname: null,
    mail: null,
    id: null,
  },

  extraReducers: {
    [fetchData.pending]: (state) => {
      state.loading = true;
      state.error.failed = false;
      state.error.message = null;
    },

    [fetchData.fulfilled]: (state, action) => {
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.loading = false;
      state.username = action.meta.arg.username;
      state.role = action.payload.user.role;
      state.mail = action.payload.user.mail;
      state.surname = action.payload.user.surname;
      state.id = action.payload.user.id;
      state.name = action.payload.user.name;
    },

    [fetchData.rejected]: (state, action) => {
      state.loading = false;
      state.error.message = action.payload;
      state.error.failed = true;
    },
  },
});

export default authSlice.reducer;