import React, { useEffect, useState } from 'react';
import {WiCloud,WiDayLightning,WiDayRainMix,WiDaySnow,WiDaySunny,WiDayLightWind} from 'react-icons/wi'

const api = {
  key: "62c36364cb50ba557121da1831445fa6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [time, setTime] = useState();
  const [checktime, setChecktime]=useState();
  const timekey = '209a577db29344d48a94eeddcac2d1e2';
  

// useEffect(()=>{
// console.log('cjanged');
// },{weather})

 const getTime=()=>{
  // console.log(weather);
  // var timestamp = weather.timezone;

    // console.log(lon, lat);
    fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=8FOIEIQW1ZVD&format=json&by=position&lat=${lat}&lng=${lon}`)
    .then(res => res.json())
    .then(result => {
      setTime(result.formatted);
      setChecktime((result.formatted.slice(11,13)))
      // console.log(time);
      // console.log(checktime);
    });
  }

  useEffect(()=>{
    getTime();
  },[lon,lat])



  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setLat(result.coord.lat);
          setLon(result.coord.lon);
          setQuery('');
          console.log('yo');
         
        })
      } 
    }
    
    
    // if(lat && lon)
    // {
    //   // console.log(weather);
      
    //   // var timestamp = weather.timezone;
    //   // console.log(lon, lat);
    //   fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=8FOIEIQW1ZVD&format=json&by=position&lat=${lat}&lng=${lon}`)
    //   .then(res => res.json())
    //   .then(result => {
    //     setTime(result.formatted);
    //     console.log(time);
    //   });
    // }
  





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
    // className={(typeof weather.main != "undefined") ? 
    //   ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}
      className='app'
      >
      <main>
      <div className={
        (18> checktime && checktime>7 )
        ? 'background bg-day': 
        ( 
          ((25>checktime && checktime>19) || (checktime > -1 && 7 >checktime)  )
          ? 'background bg-nig' 
          : 'background'
          ) 
        }>

        </div>
      <div className="container">
        <div className="top">
          <div className={
            (18> checktime && checktime>7 )
            ? 'bk bg-day': 
            ( 
              ((25>checktime && checktime>19) || (checktime > -1 && 7 >checktime)  )
              ? 'bk bg-nig' 
              : 'bk'
              ) 
            }>

            </div>
            <div className="search-box">
              <input 
                type="text"
                className="search-bar"
                placeholder="Enter City Name..."
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </div>


            {(weather.main) ? (
            <div>

              <div className="location-box">
                  <div className="time">
                    <h1>{time? time.slice(11,16):''}</h1>
                  </div>
                  <div className="date">
                    {dateBuilder(new Date())}
                  </div>
              </div>
              
            </div>) : ('')}


        </div>

          <div className="down">
          {(weather.main) ? (
            <div>
               <div className=" location">
                    {weather.name}
                    {/* , {weather.sys.country} */}
                  </div>
              <div className="weather-box">
                <div className="weather-img">
                  {
                    weather.weather[0].main == 'Clouds' ? 
                    <WiCloud className='w-icon'/>
                    :weather.weather[0].main == 'Thunderstorm' ? 
                    <WiDayLightning className='w-icon'/>
                    :weather.weather[0].main == 'Rain' ? 
                    <WiDayRainMix className='w-icon'/>
                    :weather.weather[0].main == 'Snow' ? 
                    <WiDaySnow className='w-icon'/>
                    :weather.weather[0].main == 'Clear' ? 
                    <WiDaySunny className='w-icon'/>
                    :
                    <WiDayLightWind className='w-icon'/>
                  }
                </div>
                <div className="temp">
                  {Math.round(weather.main.temp)}°
                </div>
                <div className="weather">
                  {weather.weather[0].main}
                </div>
              </div>
                <div className="weather minmax">
                  {weather.main.temp_max}°c/{weather.main.temp_min}°c
                </div>
            </div>
          ) : ('')}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;