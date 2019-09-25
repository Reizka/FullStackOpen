import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterForm = function({ setFilter, newFilter }) {
  const handleFilterField = event => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  return (
    <form>
      <h1>Search for a country</h1>
      <div>
        name: <input value={newFilter} onChange={handleFilterField} />
      </div>
    </form>
  );
};

const CountryFiltered = function({ countries, newFilter }) {
  console.log("countries", countries);

  if (countries.length === 0) {
    return <></>;
  } else {
    const found = countries.filter(function(c) {
      return (
        //https://stackoverflow.com/questions/47117868/how-to-filter-an-array-of-objects-for-case-insensitive-matches-from-any-object-k
        JSON.stringify(c.name)
          .toLowerCase()
          .indexOf(newFilter.toLowerCase()) !== -1
      );
    });

    if (found.length > 10) {
      return (
        <div>
          <p>Too many results, please specify further</p>
        </div>
      );
    } else if (found.length < 10 && found.length > 1) {
      const countriesMapped = found.map(function(country, i) {
        return <li key={i}>{country.name}</li>;
      });
      return (
        <div>
          <ul>{countriesMapped}</ul>
        </div>
      );
    } else {
      return (
        <>
          <ShowSingleCountry props={found[0]} />
        </>
      );
    }
  }
};

const ShowSingleCountry = function({ props }) {
  const languages = props.languages.map(function(lang, i) {
    return <li key={i}>{lang.name}</li>;
  });

  return (
    <div>
      <h1>{props.name}</h1>
      <p>Capital {props.capital}</p>
      <p>Population {props.population}</p>

      <h2>Languages</h2>
      <ul>{languages}</ul>
      <img width="100px" src={props.flag} alt="flag" />
    </div>
  );
};

function App() {
  let ready = false;
  const [newCountry, setCountry] = useState([]);
  const [newFilter, setFilter] = useState("");

  useEffect(() => {
    console.log("effect");

    const eventHandler = response => {
      console.log("promise fulfilled", response.data);
      setCountry(response.data);
      ready = true;
    };
    const promise = axios.get("https://restcountries.eu/rest/v2/all");
    promise.then(eventHandler);
  }, []);

  if (!ready) {
  }
  return (
    <>
      <FilterForm setFilter={setFilter} newFilter={newFilter} />
      <CountryFiltered countries={newCountry} newFilter={newFilter} />
    </>
  );
}

export default App;
