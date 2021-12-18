import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import RegisterForm from 'components/RegisterForm';
import { useDeleteContactMutation, useGetContactsQuery } from 'redux/contacts/contacts-slice';
import { useRegisterUserMutation } from 'redux/auth/auth-slice';

export default function App() {
  const [filter, setFilter] = useState<string>("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');

  const { data } = useGetContactsQuery(filter);
  const [deleteContact] = useDeleteContactMutation();
  const [registerUser, response] = useRegisterUserMutation();

  const onRegister = async (credentials: any) => {
    await registerUser(credentials); 
  }

  console.log(response);

//   const token = {
//   set(token: string) {
//     axios.defaults.headers.common.Authorization = `Bearer ${token}`;
//   },
//   remove() {
//     axios.defaults.headers.common.Authorization = '';
//   },
// };

  const filterContacts = (query: string) => {
    setFilter(query);
  }

  return (
    <div className="App">
      <h1>Phonebook</h1>
      {/* <ContactForm contacts={data}/> */}
      <RegisterForm registerUser={ onRegister}/>

      <h2>Contacts</h2>
      <Filter filterContacts={filterContacts}/>
     {data && <ContactList contacts={data} onDelete={deleteContact} />}
    </div>
  );
}
