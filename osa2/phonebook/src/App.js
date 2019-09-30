import React, { useState, useEffect } from "react";
import phonebookForm from "./components/phonebookForm";
import persons from "./components/persons";
import filter from "./components/filter";
import crud from "./components/crud";
import notification from "./components/notification";
//server requests
const getAll = crud.getAll;
const create = crud.create;
const update = crud.update;
const remove = crud.remove;

//other components
const Filter = filter;
const Persons = persons;
const PersonForm = phonebookForm;
const Notification = notification;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setFilter] = useState("");
  const [newMessage, setMessage] = useState(null);

  useEffect(() => {
    getAll().then(function(response) {
      setPersons(response);
    });
  }, []);

  const notificationTimeOut = function() {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

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
        const person = persons.find(
          n => n.name.toLowerCase() === newName.toLowerCase()
        );
        const changedNumber = { ...person, number: newNumber };
        update(person.id, changedNumber)
          .then(function(response) {
            const nps = persons.map(function(person) {
              if (person.id === response.id) {
                return (person = response);
              }
              return person;
            });
            setPersons(nps);
            setMessage(`${person.name}' has not been updated`);
            notificationTimeOut();
          })
          .catch(function(error) {
            setMessage(
              `${person.name}' has not been added to Phonebook succesfully due to '${error}`
            );
            notificationTimeOut();
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      };

      create(personObject)
        .then(function(response) {
          setPersons(persons.concat(response));
          setMessage(`${response.name}' added to Phonebook succesfully`);
          notificationTimeOut();
        })
        .catch(function(error) {
          setMessage(
            `${personObject.name}' has not been added to Phonebook succesfully due to '${error}`
          );
          notificationTimeOut();
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = function(event) {
    const id = event.currentTarget.id;
    remove(id)
      .then(function(response) {
        getAll()
          .then(function(response) {
            setPersons(response);
            setMessage("User deleted");
            notificationTimeOut();
          })
          .catch(function(error) {
            setMessage(`failed to to retrieve phonebook due to '${error}`);
            notificationTimeOut();
          });
      })
      .catch(function(error) {
        setMessage(`deleting user was not succesfull due to '${error}`);
        notificationTimeOut();
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} setFilter={setFilter} />

      <h3>Add a new</h3>
      <Notification message={newMessage} />

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
