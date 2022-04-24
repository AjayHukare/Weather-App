import React, { useState } from 'react';
const api = {
  key: "62c36364cb50ba557121da1831445fa6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [time, setTime] = useState();
  const timekey = '209a577db29344d48a94eeddcac2d1e2';
  
  

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }


  if(weather.main)
  {
    var lon = weather.coord.lon;
    var lat = weather.coord.lat;
    console.log(lon, lat);
    fetch(`https://api.ipgeolocation.io/timezone?apiKey=${timekey}&lat=${lat}&long=${lon}`)
    .then(res => res.json())
    .then(result => {
      setTime(result.time_12);
      console.log(time);
    });}





  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`
  }

  return (
    <div 
    className={(typeof weather.main != "undefined") ? 
      ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
      <div className="container">


          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>


          {(weather.main) ? (
          <div>

            <div className="location-box">
                <div className="time">
                  <h1>{time? time.slice(0,5):''} {time? time.slice(8,11):''}</h1>
                </div>
                <div className=" location">
                  {weather.name}
                  {/* , {weather.sys.country} */}
                </div>
                <div className="date">
                  {dateBuilder(new Date())}
                </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
              <div className="weather minmax">
                {weather.main.temp_max}°c/{weather.main.temp_min}°c
              </div>
            </div>
          </div>) : ('')}


      </div>
      </main>
    </div>
  );
}

export default App;