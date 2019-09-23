import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "0123456789" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);

  const addPerson = function(event) {
    event.preventDefault();
    console.log("button clicked", event.target);
    console.log("list", persons);
    console.log("included");
    if (persons.some(person => person.name === newName) || newName === "") {
      alert(`${newName} already in the list or field is empty`);
    } else {
      const personObject = { name: newName, number: newNumber };
      setPersons(persons.concat(personObject));
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNewNameField = event => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNewNumberField = event => {
    //console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const pm = persons.map(function(person, i) {
    return (
      <>
        <li key={i}>
          Name: {person.name} number: {person.number}
        </li>
      </>
    );
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameField} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberField} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{pm}</ul>
    </div>
  );
};

export default App;
