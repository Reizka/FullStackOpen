import React, { useState, useEffect } from "react";
import axios from "axios";
import phonebookForm from "./components/phonebookForm";
import persons from "./components/persons";
import filter from "./components/filter";
import crud from "./components/crud";

const getAll = crud.getAll;
const create = crud.create;
const update = crud.update;
const remove = crud.remove;

const Filter = filter;
const Persons = persons;
const PersonForm = phonebookForm;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");

    getAll().then(function(response) {
      console.log("promise fulfilled");
      setPersons(response);
    });
  }, []);

  const addPerson = function(event) {
    event.preventDefault();

    if (
      persons.some(
        person =>
          person.name.toLowerCase() === newName.toLowerCase() &&
          person.number.toLowerCase() === newNumber.toLowerCase()
      ) ||
      newName === ""
    ) {
      alert(`${newName} already in the list or field is empty`);
    } else if (
      persons.some(
        person =>
          person.name.toLowerCase() === newName.toLowerCase() &&
          person.number.toLowerCase() !== newNumber.toLowerCase()
      )
    ) {
      if (window.confirm("do you want to update the number for " + newName)) {
        console.log("nn", newName);
        const person = persons.find(
          n => n.name.toLowerCase() === newName.toLowerCase()
        );
        console.log("person", person);
        const changedNumber = { ...person, number: newNumber };
        console.log("changed person", changedNumber);
        update(person.id, changedNumber).then(function(response) {
          console.log("response i[da", response);
          const nps = persons.map(function(person) {
            if (person.id === response.id) {
              return (person = response);
            }
            return person;
          });
          console.log("nps", nps);
          setPersons(nps);
        });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };

      create(personObject).then(function(response) {
        setPersons(persons.concat(response));
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = function(event) {
    const id = event.currentTarget.id;
    console.log("delte person button clicked", id);
    remove(id).then(function(response) {
      console.log("del response", response);
      getAll().then(function(response) {
        setPersons(response);
      });
    });
  };

  const updatePerson = function(id, newPerson) {
    update(id, newPerson).then(function(response) {
      setPersons(persons.concat(response));
    });
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
      <Persons
        persons={persons}
        newFilter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  );
};
//<Persons newFilter={newFilter} persons={persons} />
export default App;
