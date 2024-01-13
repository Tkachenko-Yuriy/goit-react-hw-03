import { useState, useEffect } from "react";
import contactList from "../data/contactList.json";
import Title from "./Title/Title";
import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchForm/SearchBox";
import ContactList from "./ContactList/ContactList/ContactList";
import { nanoid } from "nanoid";
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
    setContacts([...contacts, newContact]);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title text="Phonebook"></Title>
      <ContactForm onChange={handleAddNewContact} />
      <SearchBox label="Find contacts by name" onChange={handleFilterChange} />
      <ContactList items={filteredContacts} onChange={handleDelete} />
    </div>
  );
}

export default App;
