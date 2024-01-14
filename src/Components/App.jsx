import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Notiflix from 'notiflix';
import contactList from "../data/contactList.json";
import Title from "./Title/Title";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchForm/SearchBox";
import ContactList from "./ContactList/ContactList/ContactList";
import "./App.css";

function App() {
  // const [contacts, setContacts] = useState(contactList);
  const [filter, setFilter] = useState("");

  const [contacts, setContacts] = useState(() => {
    const savedContacts = window.localStorage.getItem("Contact-list");
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return contactList;
  });

  useEffect(() => {
    window.localStorage.setItem("Contact-list", JSON.stringify(contacts));
  }, [contacts]);

  const handleDelete = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredContacts = contacts.filter((contact) => {
    const normalizeFilter = filter.toLowerCase();
    return contact.name.toLowerCase().includes(normalizeFilter);
  });


  const handleAddNewContact = (values) => {
    const newContact = { id: nanoid(), ...values };
    const uniqueContactName = contacts.some((contact) => contact.name.toLowerCase() === values.name.toLowerCase() )
    const uniqueContactNumber = contacts.some((contact) => contact.number === values.number )
    if (uniqueContactName && uniqueContactNumber) {
      Notiflix.Notify.failure('This contact is already in the contact book');
      return
    }
    if (uniqueContactNumber) {
      Notiflix.Notify.failure('This contact number is already in the contact book');
      return
    }
    setContacts([...contacts, newContact]);
    Notiflix.Notify.success('Congratulations, the contact has been successfully added');
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title text="Phonebook"></Title>
      <ContactForm onChange={handleAddNewContact} />
      <SearchBox label="Find contacts by name" onChange={handleFilterChange} />
      <ContactList items={filteredContacts} onClick={handleDelete} />
    </div>
  );
}

export default App;
