import React from "react";

const Persons = function({ newFilter, persons, deletePerson }) {
  let filtPersons;
  if (newFilter !== "") {
    filtPersons = persons.filter(function(person) {
      const lowCase = newFilter.toLowerCase();
      return person.name.toLowerCase() === lowCase;
    });
  } else {
    filtPersons = persons;
  }
  console.log("PERSONS", filtPersons);
  const pm = filtPersons.map(function(person, i) {
    return (
      <>
        <li className="person" key={i}>
          Name: {person.name} number: {person.number}
          <div>
            <button id={person.id} onClick={deletePerson}>
              delete
            </button>
          </div>
        </li>
      </>
    );
  });

  return <ul>{pm}</ul>;
};

export default Persons;
