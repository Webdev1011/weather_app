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
  const [showLoading, setShowLoading] = useState(false);
  const [navigateToVar, setNavigateToVar] = useState("/");
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
    setShowLoading(true);
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
        });
        setShowLoading(false);
        setNavigateToVar("/country");
      })
      .catch((error) => {
        alert("Write full country name.");
        setShowLoading(false);
      });
  }
  function getCapitalDetails() {
    setShowLoading(true);
    fetch(
      `http://api.weatherstack.com/current?access_key=c63901e6269dcb53df1b52bcf39d5474&query=${countryData["capital"]}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCapitalWeather({
          temperature: json.current.temperature,
          weather_icon: json.current.weather_icons[0],
          wind_speed: json.current.wind_speed,
          precip: json.current.precip,
        });
        setShowLoading(false);
        setNavigateToVar("/capital-weather");
      })
      .catch((error) => {
        console.log(error);
        alert("No Data Found.");
        setShowLoading(false);
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
            showLoading ? (
              <h1> Loading </h1>
            ) : (
              <Homepage
                btnDisabled={btnDisabled}
                textRef={textRef}
                textChanged={textChanged}
                country={country}
                getCountryDetails={getCountryDetails}
                navigateToVar={navigateToVar}
              />
            )
          }
        />
        <Route
          path="/country"
          element={
            showLoading ? (
              <h1> Loading </h1>
            ) : (
              <Country
                countryData={countryData}
                getCapitalDetails={getCapitalDetails}
                navigateToVar={navigateToVar}
              />
            )
          }
        />
        <Route
          path="/capital-weather"
          element={
            showLoading ? (
              <h1> Loading </h1>
            ) : (
              <CapitalWeather capitalWeather={capitalWeather} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
