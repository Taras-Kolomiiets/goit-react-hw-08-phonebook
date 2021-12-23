import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormButton from '../FormButton/FormButton';
import s from './ContactForm.module.css';
import { useCreateContactMutation } from 'redux/contacts/contacts-slice';
import IContacts from 'interfaces/IContacts';
import IContact from 'interfaces/IContact';

export default function ContactForm({
  contacts,
  token,
  createContact,
}: IContacts) {
  const isInContacts = (name: string) => {
    name = name.toLowerCase();
    return (
      contacts.filter((contact: IContact) =>
        contact.name.toLowerCase().includes(name),
      ).length > 0
    );
  };

  const addContactToPhonebook = ({
    name,
    number,
  }: {
    name: string;
    number: string;
  }) => {
    if (isInContacts(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = { name, number };

    console.log({ contact, token });

    createContact({ contact, token });
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required()
            .matches(
              /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
              "Name can contain only letters, ', - and space.",
            ),
          number: Yup.string()
            .required()
            .matches(
              /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
              'Phone number should contain only numbers and it also could contain spaces, dash, parenthesis and starts with +',
            ),
        })}
        onSubmit={(values, { resetForm }) => {
          addContactToPhonebook(values);
          resetForm();
        }}
      >
        <Form className={s.form}>
          <label className={s.label}>
            Name:
            <Field
              className={s.fieldInput}
              name="name"
              type="text"
              placeholder="enter your name"
            />
            <ErrorMessage
              name="name"
              component="span"
              className={s.validatorError}
            />
          </label>
          <label className={s.label}>
            Phone number:
            <Field
              className={s.fieldInput}
              name="number"
              type="tel"
              placeholder="enter your phone number"
            />
            <ErrorMessage
              name="number"
              component="span"
              className={s.validatorError}
            />
          </label>
          <FormButton type="submit">Add contact</FormButton>
        </Form>
      </Formik>
      <hr />
    </div>
  );
}
