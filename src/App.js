import React, {useState} from 'react';

const api = {
  key: "0fed2288a38867b574a1a24872a5e9af",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = event => {
    if (event.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      })
    }
  }
   
    const DateData = (d) => {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`
    }

  return (
    <div className={
      (typeof weather.main != "undefined") 
      ?((weather.main.temp > 20)
        ? 'app warmweather'
        : 'app') 
      : 'app'}>
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Looking for"
            onChange={e=> setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="place-box">
              <div className="place">{weather.name}, {weather.sys.country}</div>
              <div className="date">{DateData(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temperature">
              {Math.round(weather.main.temp)}°
              </div>
              <div className="weather-status">{weather.weather[0].main}
              </div>
            </div>
         </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
