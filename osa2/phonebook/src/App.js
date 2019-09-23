import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = function(event) {
    event.preventDefault();
    console.log("button clicked", event.target);
    const personObject = { name: newName };
    //date: new Date().toISOString(),
    //important: Math.random() > 0.5,
    //id: notes.length + 1,

    setPersons(persons.concat(personObject));
    setNewName("");
  };

  const handleDataChange = event => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  };

  const pm = persons.map(function(person, i) {
    return (
      <>
        <li key={i}>Name: {person.name}</li>
      </>
    );
  });

  console.log("list", persons);
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleDataChange} />
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
