import './App.css';
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import AppBar from 'components/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LinearProgress } from '@material-ui/core';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

import {
  useDeleteContactMutation,
  useGetContactsQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
} from 'redux/contacts/contacts-slice';
import {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetCurrentUserMutation,
} from 'redux/auth/auth-slice';

const AuthPage = lazy(
  () => import('./pages/AuthPage' /* webpackChunkName: "auth-page" */),
);

const ContactsPage = lazy(
  () => import('./pages/ContactsPage' /* webpackChunkName: "contacts-page" */),
);

export default function App() {
  const [filter, setFilter] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [isLogging, setIsLogging] = useState<boolean>(false);

  const { data } = useGetContactsQuery(token);
  const [createContact] = useCreateContactMutation();
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const [logoutUser] = useLogoutUserMutation();
  const [getCurrentUser] = useGetCurrentUserMutation();

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser(localStorage.getItem('token'));
      await setToken(localStorage.getItem('token'));
      if ('data' in user) {
        await setUser(user.data);
      }
    }

    fetchUser();
  }, [getCurrentUser]);

  const onRegister = async (credentials: any) => {
    try {
      const result = await registerUser(credentials);
      if ('data' in result) {
        setUser(result.data.user);
        setToken(result.data.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async (credentials: any) => {
    try {
      const result = await loginUser(credentials);
      if ('data' in result) {
        setUser(result.data.user);
        setToken(result.data.token);
        localStorage.setItem('token', result.data.token);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onLogout = async () => {
    try {
      await logoutUser(token);
      setUser(null);
      setToken('');
      localStorage.removeItem('token');
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteContact = (id: string) => {
    deleteContact({ id, token });
  };

  const onCreateContact = (contact: any) => {
    createContact({ contact, token });
  };

  const onEdit = (contact: any, id: string) => {
    updateContact({ id, token, contact });
  };

  const filterContacts = (query: string) => {
    setFilter(query);
  };

  return (
    <div className="App">
      <CssBaseline />
      {isLogging ? (
        <LinearProgress />
      ) : (
        <>
          {user && (
            <AppBar
              isLoggedIn={isLoggedIn}
              userName={user.name}
              onLogOut={onLogout}
            />
          )}
          <Suspense fallback={<LinearProgress />}>
            <Routes>
              <PrivateRoute path="/" exact redirectTo="/login">
                <Navigate to="/contacts" />
              </PrivateRoute>
              <PublicRoute path="/login" restricted redirectTo="/contacts">
                <AuthPage
                  contacts={data}
                  token={token}
                  registerUser={onRegister}
                  loginUser={onLogin}
                />
              </PublicRoute>
              <PublicRoute path="/register" restricted redirectTo="/contacts">
                <AuthPage registerUser={onRegister} loginUser={onLogin} />
              </PublicRoute>
              <PrivateRoute path="/contacts">
                <ContactsPage
                  filterContacts={filterContacts}
                  createContact={onCreateContact}
                  contacts={data}
                  onDelete={onDeleteContact}
                  onEdit={onEdit}
                />
              </PrivateRoute>
              <Route>
                <Navigate to="/" />
              </Route>
            </Routes>
          </Suspense>
        </>
      )}
    </div>
  );
}
