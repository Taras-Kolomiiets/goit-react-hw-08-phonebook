import logger from 'redux-logger';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import { contactsApi } from './contacts/contacts-slice';
import { authApi } from './auth/auth-slice';

const authPersistConfig = {
  key: 'authApi',
  storage,
  whitelist: ['authApi'],
};

const rootReducer = combineReducers({
  [contactsApi.reducerPath]: contactsApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
const persistedReducer = persistReducer(authPersistConfig, rootReducer);

const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => next => action => {
    if (isRejectedWithValue(action)) {
      console.warn('We got a rejected action!');
    }
    return next(action);
  };

const middlewareHandler = (getDefaultMiddleware: any) => {
  const middlewareList = [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
    authApi.middleware,
    contactsApi.middleware,
    rtkQueryErrorLogger,
  ];
  if (process.env.NODE_ENV === 'development') {
    middlewareList.push(logger);
  }
  return middlewareList;
};

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => middlewareHandler(getDefaultMiddleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
