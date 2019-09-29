import React from "react";
import crud from "./crud";

const create = crud.create;

const PhonebookForm = function({
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

export default PhonebookForm;
