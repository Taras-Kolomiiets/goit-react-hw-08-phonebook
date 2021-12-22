import FormButton from '../FormButton';
import { MdDelete } from 'react-icons/md';
import s from './ContactList.module.css';
import IContacts from 'interfaces/IContacts';
import IContact from 'interfaces/IContact';
import ContactItem from 'components/ContactItem';

interface IContactsList extends IContacts {
  onDelete: (id: string) => void;
  onEdit: (contact: any, id: string) => void;
}

export default function ContactList({
  contacts,
  onDelete,
  onEdit,
}: IContactsList) {
  return (
    <ul className={s.list}>
      {contacts &&
        contacts.map((contact: IContact) => (
          <ContactItem contact={contact} onDelete={onDelete} onEdit={onEdit} />
        ))}
    </ul>
  );
}
