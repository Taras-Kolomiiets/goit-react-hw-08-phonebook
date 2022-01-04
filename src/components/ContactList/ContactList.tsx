import IContacts from 'interfaces/IContacts';
import IContact from 'interfaces/IContact';
import ContactItem from 'components/ContactItem';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface IContactsList extends IContacts {
  onDelete: (id: string) => void;
  onEdit: (contact: any, id: string) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    listStyle: 'none',
  },
}));

export default function ContactList({
  contacts,
  onDelete,
  onEdit,
}: IContactsList) {
  const c = useStyles();

  return (
    <Grid container component="ul" spacing={3} className={c.root}>
      {contacts.length > 0 &&
        contacts.map(contact => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
    </Grid>
  );
}
