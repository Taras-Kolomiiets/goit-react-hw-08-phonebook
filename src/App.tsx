import { Suspense, lazy, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import IUser from 'interfaces/IUser';
import IRegister from 'interfaces/IRegister';
import IContact from 'interfaces/IContact';
import ILogin from 'interfaces/ILogin';

const AuthPage = lazy(
  () => import('./pages/AuthPage' /* webpackChunkName: "auth-page" */),
);

const ContactsPage = lazy(
  () => import('./pages/ContactsPage' /* webpackChunkName: "contacts-page" */),
);

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const { data, isLoading } = useGetContactsQuery(token);
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
      setToken(localStorage.getItem('token'));
      if ('data' in user) {
        setUser(user.data);
        setIsLoggedIn(true);
      }
    }

    fetchUser();
  }, [getCurrentUser]);

  const onRegister = async (credentials: IRegister) => {
    try {
      const result = await registerUser(credentials);
      if ('data' in result) {
        setUser(result.data.user);
        setToken(result.data.token);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onLogin = async (credentials: ILogin) => {
    try {
      const result = await loginUser(credentials);
      if ('data' in result) {
        setUser(result.data.user);
        setToken(result.data.token);
        setIsLoggedIn(true);
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
      setIsLoggedIn(false);
      localStorage.removeItem('token');
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteContact = (id: string) => {
    deleteContact({ id, token });
  };

  const onCreateContact = (contact: IContact) => {
    createContact({ contact, token });
  };

  const onEdit = (contact: IContact, id: string) => {
    updateContact({ id, token, contact });
  };

  return (
    <div className="App">
      <CssBaseline />
      {isLoading ? (
        <LinearProgress />
      ) : (
        <>
          <AppBar
            isLoggedIn={isLoggedIn}
            userName={user?.name}
            onLogOut={onLogout}
          />
          <Suspense fallback={<LinearProgress />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute isLoggedIn={isLoggedIn} restricted>
                    <AuthPage
                      isLoading={isLoading}
                      registerUser={onRegister}
                      loginUser={onLogin}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute
                    isLoggedIn={isLoggedIn}
                    redirectTo="/contacts"
                    restricted
                  >
                    <AuthPage
                      isLoading={isLoading}
                      registerUser={onRegister}
                      loginUser={onLogin}
                    />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute
                    restricted
                    redirectTo="/contacts"
                    isLoggedIn={isLoggedIn}
                  >
                    <AuthPage
                      isLoading={isLoading}
                      registerUser={onRegister}
                      loginUser={onLogin}
                    />
                  </PublicRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute redirectTo="/login" isLoggedIn={isLoggedIn}>
                    <ContactsPage
                      isLoading={isLoading}
                      createContact={onCreateContact}
                      contacts={data}
                      onDelete={onDeleteContact}
                      onEdit={onEdit}
                    />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </>
      )}
    </div>
  );
}
