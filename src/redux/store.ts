import logger from 'redux-logger';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { contactsApi } from './contacts/contacts-slice';

const middleware = [
  ...getDefaultMiddleware(),
  logger,
  contactsApi.middleware,
];

export const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});



