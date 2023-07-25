import "./App.css";
import contacts from "./contacts.json";
import { useState } from "react"; // Don't forget to import useState from react

function App() {
  const [contactsState, setContactsState] = useState(contacts.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = useState(contacts.slice(5));
  
  function award(won){
    if (won ===true ){
      return "🏆"
    }
    else{
      return ""
    }
  }

  function addRandomContact() {
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);

      const randomContact = remainingContacts[randomIndex];

      const updatedRemainingContacts = remainingContacts.filter(
        (contact) => contact.id !== randomContact.id
      );

      setContactsState((prevContacts) => [...prevContacts, randomContact]);

      setRemainingContacts(updatedRemainingContacts);
    }
  }

  function sortPopularity() {
    setContactsState((prevContacts) => [...prevContacts].sort((a, b) => b.popularity - a.popularity));
  }
  
  function sortName() {
    setContactsState((prevContacts) => [...prevContacts].sort((a, b) => a.name.localeCompare(b.name)));
  }
  
  function deleteActor(contactId) {
    const updatedContacts = contactsState.filter((contact) => contact.id !== contactId);
    setContactsState(updatedContacts);
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={addRandomContact} className="Button">Add Random Contact</button>
      <button onClick={sortPopularity} className="Button">Sort by popularity</button>
      <button onClick={sortName} className="Button">Sort by Name</button>
      <table className="Table">
        <thead>
          <tr className="titles">
            <th>Picture</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contactsState.map((contact) => (
            <tr key={contact.id} className="Element">
              <td>
                <img src={contact.pictureUrl} alt={contact.name} />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              <td>{award(contact.wonOscar)}</td>
              <td>{award(contact.wonEmmy)}</td>
              <td><button onClick={() => deleteActor(contact.id)} className="btn-delete">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default App;
