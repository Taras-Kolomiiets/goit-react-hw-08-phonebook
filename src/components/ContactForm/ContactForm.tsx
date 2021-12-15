import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import FormButton from '../FormButton/FormButton';
import s from './ContactForm.module.css';
import { useCreateContactMutation } from 'redux/contacts/contacts-slice';
import IContacts from 'interfaces/IContacts'
import IContact from 'interfaces/IContact'


export default function ContactForm({contacts}: IContacts) {
  const [createContact] = useCreateContactMutation();

  const isInContacts = (name: string) => {
    name = name.toLowerCase();
    return (
      contacts.filter((contact: IContact) => contact.name.toLowerCase().includes(name))
        .length > 0
    );
  };

  const addContactToPhonebook = ({ name, phone }: {name: string, phone: string}) => {
    if (isInContacts(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {name, phone}

    createContact(contact);
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '', phone: '' }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required()
            .matches(
              /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
              "Name can contain only letters, ', - and space.",
            ),
          phone: Yup.string()
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
              name="phone"
              type="tel"
              placeholder="enter your phone number"
            />
            <ErrorMessage
              name="phone"
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
