import { useSelector, useDispatch } from 'react-redux';
import Contacts from 'components/Contacts/Contacts';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import { Wrapper } from './App.styled';
import { addContact, deleteContact } from 'redux/contacts/slice';
import { addFilter } from 'redux/filter/slice';
import { nanoid } from 'nanoid';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.filter);

  const addContacts = formData => {
    const { name, number } = formData;
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    dispatch(addContact(newContact));
  };

  const filterInput = e => {
    dispatch(addFilter(e.currentTarget.value));
  };

  const сontactList = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteButton = conId => {
    dispatch(deleteContact(conId));
  };

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts} />
      <h2>Contacts</h2>
      <Filter value={filter} findContact={filterInput} />
      <Contacts contacts={сontactList()} deleteButton={deleteButton} />
    </Wrapper>
  );
};

export default App;
