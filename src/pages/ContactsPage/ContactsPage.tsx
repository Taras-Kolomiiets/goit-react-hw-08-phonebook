import {
  Button,
  Container,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import ContactEditor from 'components/ContactEditor';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

export default function ContactsPage({
  contacts,
  onDelete,
  onEdit,
  createContact,
  isLoading,
}: any) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [filter, setFilter] = useState<string>('');

  const shouldOpenDialog = Boolean(isOpenDialog || currentContact);

  const c = useStyles();

  const filterContacts = (query: string) => {
    setFilter(query);
  };

  const handleDialogOpen = () => {
    setIsOpenDialog(true);
  };

  const handleDialogClose = () => {
    setIsOpenDialog(false);
    setCurrentContact(null);
  };

  const handleCurrentContact = (contact: any) => {
    setCurrentContact(contact);
  };

  const filterContactsByQuery = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact: any) =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  return (
    <>
      <Container maxWidth="md" className={c.root}>
        <Button variant="contained" color="primary" onClick={handleDialogOpen}>
          Add contact
        </Button>
        <Typography variant="h3">Contacts</Typography>
        <Filter filterContacts={filterContacts} />
        <ContactList
          contacts={filterContactsByQuery()}
          onDelete={onDelete}
          onEdit={handleCurrentContact}
        />
        {isLoading && <LinearProgress />}
      </Container>

      {shouldOpenDialog && (
        <ContactEditor
          isOpen={shouldOpenDialog}
          onClose={handleDialogClose}
          contact={currentContact}
          contacts={contacts}
          editContact={onEdit}
          addContact={createContact}
        />
      )}
    </>
  );
}
