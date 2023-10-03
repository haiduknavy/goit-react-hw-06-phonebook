import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Contacts from 'components/Contacts/Contacts';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import { Wrapper } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localContacts = JSON.parse(localStorage.getItem('contacts'));
    if (localContacts) {
      setContacts(localContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = formData => {
    const { name, number } = formData;
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      return alert(`${newContact.name} is already in contacts.`);
    }

    setContacts([newContact, ...contacts]);
    // this.setState(({ contacts }) => ({
    //   contacts: [newContact, ...contacts],
    // }));
  };

  const filterInput = e => {
    setFilter(e.currentTarget.value);
  };

  const findContact = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteButton = conId => {
    // this.setState(prevState => ({
    //   contacts: prevState.contacts.filter(contact => contact.id !== conId),
    // }));
    setContacts(contacts.filter(contact => contact.id !== conId));
  };

  return (
    <Wrapper>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter findContact={filterInput} />
      <Contacts contacts={findContact()} deleteButton={deleteButton} />
    </Wrapper>
  );
};

export default App;
