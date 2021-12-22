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
}: any) {
  const c = useStyles();

  const isInContacts = (name: string) => {
    name = name.toLowerCase();
    return (
      contacts.filter((contact: any) => contact.name.toLowerCase() === name)
        .length > 0
    );
  };

  // const addContact = ({ name, number }: any) => {
  //   dispatch(contactsOperations.addContact({ name, number }));
  //   onClose();
  // };

  // const updateContact = ({ name, number }: any) => {
  //   const updatedContact = { ...contact, name, number };
  //   dispatch(contactsOperations.updateContact(updatedContact));
  // };

  // const onSubmit = (values, { setSubmitting }) => {
  //   if (isInContacts(values.name)) {
  //     alert(`${values.name} is already in contacts`);
  //     setSubmitting(false);
  //     return;
  //   }

  //   if (contact) {
  //     updateContact(values);
  //   } else {
  //     addContact(values);
  //   }
  //   onClose();
  // };

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
          onSubmit={() => console.log('5')}
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
