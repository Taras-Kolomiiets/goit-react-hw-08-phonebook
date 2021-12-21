import './App.css';
import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import RegisterForm from 'components/RegisterForm';
import {
  useDeleteContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from 'redux/contacts/contacts-slice';
import {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} from 'redux/auth/auth-slice';
import LoginForm from 'components/LoginForm';
import UserMenu from 'components/UserMenu';

export default function App() {
  const [filter, setFilter] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<any>('');

  const { data } = useGetContactsQuery(token);
  const [deleteContact] = useDeleteContactMutation();
  const [updateContact] = useUpdateContactMutation();
  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();
  const [logoutUser] = useLogoutUserMutation();

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
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteContact = (id: string) => {
    deleteContact({ id, token });
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
      <Filter filterContacts={filterContacts} />
      {data && (
        <ContactList
          contacts={data}
          onDelete={onDeleteContact}
          onEdit={onEdit}
        />
      )}
    </div>
  );
}
