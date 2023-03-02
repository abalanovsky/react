import './App.css';
import {useState} from "react";
import {SelectCity} from "./components/SelectCity/SelectCity";
import {WeatherInfo} from "./components/WeatherInfo/WeatherInfo";

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

function App() {
    const [city, setCity] = useState(null)
    const date = new Date()
  return (
    <div className="App">
        <div className="header">
            <h1 className="header-title">WEATHER FORECAST</h1>
            <h2 className="header-info">{date.getDate()} {monthNames[date.getMonth()]}</h2>
        </div>
        <div className="container">
      <WeatherInfo city={city}/>
      <SelectCity handleSelect={setCity} />
        </div>

    </div>
  );
}

export default App;
