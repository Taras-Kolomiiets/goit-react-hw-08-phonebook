import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { contactsApi } from './contacts/contacts-slice';
import { authApi } from './auth/auth-slice';

const middleware = [
  ...getDefaultMiddleware(),
  logger,
  authApi.middleware,
  contactsApi.middleware,
];

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});



