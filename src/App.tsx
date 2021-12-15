import './App.css';
import {useState} from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { useDeleteContactMutation, useGetContactsQuery } from 'redux/contacts/contacts-slice';

export default function App() {
  const [filter, setFilter] = useState<string>("");

  const { data } = useGetContactsQuery(filter);
  const [deleteContact] = useDeleteContactMutation();

  const filterContacts = (query: string) => {
    setFilter(query);
  }

  return (
    <div className="App">
      <h1>Phonebook</h1>
      <ContactForm contacts={data}/>

      <h2>Contacts</h2>
      <Filter filterContacts={filterContacts}/>
     {data && <ContactList contacts={data} onDelete={deleteContact} />}
    </div>
  );
}
