import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import contentSlice from '../features/content/contentSlice';
import usersSlice from '../features/users/usersSlice';

const initialAuthSlice =
  localStorage.getItem('smm-token-slice') !== null
    ? JSON.parse(localStorage.getItem('smm-token-slice'))
    : undefined;

export const store = configureStore({
  reducer: {
    authSlice,
    contentSlice,
    usersSlice,
  },

  preloadedState: {
    authSlice: initialAuthSlice,
  },
});

let prevState = store.getState();

store.subscribe(() => {
  const state = store.getState();

  if (state.authSlice.token !== prevState.authSlice.token) {
    localStorage.setItem('smm-token-slice', JSON.stringify(state.authSlice));
  }

  prevState = state;
});
