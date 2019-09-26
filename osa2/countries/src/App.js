import React, { useState, useEffect } from "react";
import axios from "axios";

const api = "d573b08a0d3c269cca0533a25bd3333b";

const GetWeather = function({ weather, capital }) {
  console.log("weather", weather);
  if (weather.current) {
    return (
      <>
        <h2>weather in {capital}</h2>
        <p>
          <b>Temperature</b>
          {weather.current.temperature}
        </p>
        <img width="100px" src={weather.current.weather_icons} alt="flag" />
        <p>
          <b>Wind</b>
          {weather.current.wind_speed}
        </p>
      </>
    );
  } else {
    return <></>;
  }
};

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

const CountryFiltered = function({
  countries,
  newFilter,
  setFilter,
  setCapital
}) {
  console.log("countries", countries);
  setCapital("");
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
    //https://stackoverflow.com/questions/51846915/how-do-i-get-the-id-of-a-button-that-was-clicked-reactjs
    const onShowBtnClick = function(event) {
      const target = event.currentTarget.id;
      setFilter(target);
    };

    if (found.length > 10) {
      return (
        <div>
          <p>Too many results, please specify further</p>
        </div>
      );
    } else if (found.length < 10 && found.length > 1) {
      const countriesMapped = found.map(function(country, i) {
        return (
          <>
            <li key={i}>
              {country.name}{" "}
              <button id={country.name} onClick={onShowBtnClick}>
                show
              </button>
            </li>
          </>
        );
      });

      return (
        <div>
          <ul>{countriesMapped}</ul>
        </div>
      );
    } else {
      console.log("Capital", found[0].capital);
      setCapital(found[0].capital);
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
  const [newCountry, setCountry] = useState([]);
  const [capital, setCapital] = useState("");
  const [newFilter, setFilter] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    console.log("effect");

    const eventHandler = response => {
      console.log("promise fulfilled", response.data);
      setCountry(response.data);
    };
    const promise = axios.get("https://restcountries.eu/rest/v2/all");
    promise.then(eventHandler);
  }, []);

  useEffect(() => {
    console.log("weather effect called!", capital);
    console.log(
      "http://api.weatherstack.com/current?access_key=" +
        api +
        "&query=" +
        capital
    );

    const eventHandler = response => {
      console.log("promise fulfilled", response.data);
      setWeather(response.data);
    };
    const promise = axios.get(
      "http://api.weatherstack.com/current?access_key=" +
        api +
        "&query=" +
        capital
    );
    promise.then(eventHandler);
  }, [capital]);

  return (
    <>
      <FilterForm setFilter={setFilter} newFilter={newFilter} />
      <CountryFiltered
        countries={newCountry}
        newFilter={newFilter}
        setFilter={setFilter}
        setCapital={setCapital}
      />
      <GetWeather capital={capital} weather={weather} />
    </>
  );
}

export default App;
