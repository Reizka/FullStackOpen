import React from "react";

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

export default Filter;
