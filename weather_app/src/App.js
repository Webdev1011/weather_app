import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage.js";
import Country from "./Country.js";
import CapitalWeather from "./CapitalWeather";

function App() {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const textRef = useRef();
  const [country, setCountry] = useState("");
  const [dataIsReturned, setDataIsReturned] = useState(false);
  const [countryData, setCountryData] = useState({
    name: "",
    capital: "",
    population: "",
    lat: "",
    lng: "",
    flag: "",
  });
  const [capitalWeather, setCapitalWeather] = useState({
    temperature: "",
    weather_icon: "",
    wind_speed: "",
    precip: "",
  });
  function getCountryDetails() {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => res.json())
      .then((json) => {
        json.map((data, key) => {
          setCountryData({
            name: data.name.common,
            capital: data.capital,
            population: data.population,
            lat: data.latlng[0],
            lng: data.latlng[1],
            flag: data.flags["png"],
          });
          setDataIsReturned(true);
        });
      });
  }
  function getCapitalDetails() {
    fetch(
      `http://api.weatherstack.com/current?access_key=c63901e6269dcb53df1b52bcf39d5474&query=${countryData["capital"]}`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // json.map((data, key) => {
        // setCountryData({
        //   name: data.name.common,
        //   capital: data.capital,
        //   population: data.population,
        //   lat: data.latlng[0],
        //   lng: data.latlng[1],
        //   flag: data.flags["png"],
        // });
        // setDataIsReturned(true);
        // });
      });
  }
  const textChanged = () => {
    setCountry(textRef.current.value);
    if (textRef.current.value) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              btnDisabled={btnDisabled}
              textRef={textRef}
              textChanged={textChanged}
              country={country}
              getCountryDetails={getCountryDetails}
            />
          }
        />
        <Route
          path="/country"
          element={
            dataIsReturned ? (
              <Country
                countryData={countryData}
                getCapitalDetails={getCapitalDetails}
              />
            ) : (
              <h1> Loading </h1>
            )
          }
        />
        <Route
          path="/capital-weather"
          element={
            dataIsReturned ? (
              <CapitalWeather capitalWeather={capitalWeather} />
            ) : (
              <h1> Loading </h1>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
