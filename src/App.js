import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");


  //can change units to imperial tr it when u see this!
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8862ca79296c2887453a4e1310c20915`;

  <link
    href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:wght@600&display=swap"
    rel="stylesheet"
  />;

  //connecting to API on search fxn n run axios n render all
  // this in an 'Enter' button
const searchLocation = async (event) => {
  if (event.key === "Enter") {
    if (!location.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      const response = await axios.get(url);

      // Extra safety check
      if (response.status !== 200) {
        throw new Error("Invalid city");
      }

      setData(response.data);
      setError("");
    } catch (err) {
      console.log(err); // for debugging

      // Handle specific Axios error
      if (err.response && err.response.status === 404) {
        setError("Please enter a valid city name");
      } else {
        setError("Something went wrong. Try again.");
      }

      setData({});
    }

    setLocation("");
  }
};

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{Math.floor(data.main.temp - 273.15)}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <h2>{data.weather[0].main}</h2> : null}
          </div>
        </div>
        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {Math.floor(data.main.feels_like - 273.15)}°C
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
