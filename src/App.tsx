import './App.css';
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import RegisterForm from 'components/RegisterForm';
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
import LoginForm from 'components/LoginForm';
import UserMenu from 'components/UserMenu';
import ContactsPage from 'components/ContactsPage';

export default function App() {
  const [filter, setFilter] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>('');

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
      {user && <UserMenu userName={user.name} onLogOut={onLogout} />}

      <ContactForm contacts={data} token={token} />
      <RegisterForm registerUser={onRegister} />
      <LoginForm loginUser={onLogin} />

      <h2>Contacts</h2>
      <ContactsPage
        filterContacts={filterContacts}
        createContact={onCreateContact}
        contacts={data}
        onDelete={onDeleteContact}
        onEdit={onEdit}
      />
    </div>
  );
}
