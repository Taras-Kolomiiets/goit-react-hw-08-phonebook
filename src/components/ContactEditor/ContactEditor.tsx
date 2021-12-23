import * as Yup from 'yup';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  field: {
    marginBottom: theme.spacing(3),
  },
}));

export default function ContactEditor({
  isOpen,
  onClose,
  contact,
  contacts,
  editContact,
  addContact,
}: any) {
  const c = useStyles();

  const isInContacts = (name: string) => {
    name = name.toLowerCase();
    return (
      contacts.filter((contact: any) => contact.name.toLowerCase() === name)
        .length > 0
    );
  };

  const createContact = ({ name, number }: any) => {
    addContact({ name, number });
    onClose();
  };

  const updateContact = ({ name, number }: any) => {
    const updatedContact = { ...contact, name, number };
    console.log(updatedContact.id);

    editContact(updatedContact, updatedContact.id);
  };

  const onSubmit = (values: any, { setSubmitting }: any) => {
    if (isInContacts(values.name)) {
      alert(`${values.name} is already in contacts`);
      setSubmitting(false);
      return;
    }

    if (contact) {
      updateContact(values);
    } else {
      createContact(values);
    }
    onClose();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {contact ? 'Edit contact' : 'Add contact'}
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: contact ? contact.name : '',
            number: contact ? contact.number : '',
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .matches(
                /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
                "Name can contain only letters, ', - and space. For example: Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan etc.",
              )
              .required(),
            number: Yup.string()
              .matches(
                /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
                'Phone number should contain only numbers and it also could contain spaces, dash, parenthesis and startts with +',
              )
              .required(),
          })}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }: any) => (
            <Form>
              <Field
                name="name"
                type="text"
                label="Name"
                component={TextField}
                className={c.field}
                fullWidth
              />
              <Field
                name="number"
                type="tel"
                label="Phone number"
                component={TextField}
                className={c.field}
                fullWidth
              />
              {isSubmitting && <LinearProgress />}

              <DialogActions>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                >
                  Save contact
                </Button>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
