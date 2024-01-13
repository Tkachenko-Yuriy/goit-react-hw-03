import { useState } from "react";
import contactList from "../data/contactList.json";
import "./App.css";
import Title from "./Title/Title";
// import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchForm/SearchBox";
import ContactList from "./ContactList/ContactList/ContactList";

function App() {
  const [contacts, setContacts] = useState(contactList);
  const [filter, setFilter] = useState("");

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

  return (
    <div>
      <Title text="Phonebook"></Title>
      {/* <ContactForm /> */}
      <SearchBox label="Find contacts by name" onChange={handleFilterChange} />
      <ContactList items={filteredContacts} onChange={handleDelete} />
    </div>
  );
}

export default App;
