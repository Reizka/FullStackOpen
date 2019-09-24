import React, { useState, useEffect } from "react";
import axios from "axios";

const Filter = function({ newFilter, setFilter }) {
  const handleFilter = event => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <form>
      <div>
        Filter: <input value={newFilter} onChange={handleFilter}></input>
      </div>
    </form>
  );
};

const PersonForm = function({
  addPerson,
  newName,
  newNumber,
  setNewName,
  setNewNumber
}) {
  const handleNewNameField = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNewNumberField = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
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
  );
};

const Persons = function({ newFilter, persons }) {
  let filtPersons;
  if (newFilter !== "") {
    filtPersons = persons.filter(function(person) {
      const lowCase = newFilter.toLowerCase();
      return person.name.toLowerCase() === lowCase;
    });
  } else {
    filtPersons = persons;
  }
  const pm = filtPersons.map(function(person, i) {
    return (
      <>
        <li key={i}>
          Name: {person.name} number: {person.number}
        </li>
      </>
    );
  });

  return <ul>{pm}</ul>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");

    const eventHandler = response => {
      console.log("promise fulfilled");
      setPersons(response.data);
    };

    const promise = axios.get("http://localhost:3001/persons");
    promise.then(eventHandler);
  }, []);

  const addPerson = function(event) {
    event.preventDefault();

    if (persons.some(person => person.name === newName) || newName === "") {
      alert(`${newName} already in the list or field is empty`);
    } else {
      const personObject = { name: newName, number: newNumber };
      setPersons(persons.concat(personObject));
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} newFilter={newFilter} />
    </div>
  );
};
//<Persons newFilter={newFilter} persons={persons} />
export default App;
