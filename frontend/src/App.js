import React, { useState, useEffect } from "react";
import "./App.css";
import MapChart from "./components/MapChart";
import axios from "axios";

function App() {
  const [states, setStates] = useState([]);
  const [date, setDate] = useState('2020-11-03');
    const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/states")
      .then((res) => setStates(res.data));
  }, []);

    useEffect(() => {
        const day = new Date(date);
        const addZero = day.getDate() < 10 ? `0${day.getDate()}` : day.getDate();
        axios
            .get("http://localhost:8080/states-map-info", { params: { date: `${day.getMonth() + 1}/${addZero}/${day.getFullYear()}` }})
            .then((res) => setData(res.data));
    }, [date]);

  return (
    <div className="App">
      <header className="app-header">
        <p className="app-name">COVID-19 Tracker</p>
        <ul className="nav">
          <li>
            <a href="#Home">Home</a>
          </li>
          <li>
            <a href="#Map">Map</a>
          </li>
          <li>
            <a href="#Reports">Reports</a>
          </li>
          <li>
            <a href="#Political-Party-Correlation">
              Political Party Correlation
            </a>
          </li>
        </ul>
      </header>
      <section id="Home">
        <h2>Home</h2>
        <p>Welcome to the COVID-19 National Case Tracker!</p>
      </section>

      <section id="Map">
        <h2>Map</h2>
        <p>
          View state-specific information including location, population, and
          COVID-19 severity.
        </p>
          <label htmlFor="date">Choose a Date:</label>
          <br/>
          <input
              type="date"
              id="date"
              name="date"
              placeholder="2020-07-23"
              min="2020-07-01"
              max="2020-11-03"
              value={date}
              onChange={(e) => setDate(e.target.value)}
          ></input>
          <br/>
        <MapChart data={data} setData={setData} />
      </section>

      <section id="Reports">
        <h2>Reports</h2>
        <p>Read the daily COVID-19 reports by state</p>
        <form>
          <label for="state">Choose a State:</label>
          <br />
          <select name="state" id="state">
            {states.map((state) => {
              return <option value={state.id}>{state.name}</option>;
            })}
          </select>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </section>

      <section id="Political-Party-Correlation">
        <h2>Political Party Correlation</h2>
        <p>Please select a political party:</p>
        <form>
          <input type="radio" id="republican" name="party" value="1" />
          <label for="republican">Republican</label>
          <br />
          <input type="radio" id="democrat" name="party" value="2" />
          <label for="democrat">Democrat</label>
          <br />
          <label for="date">Choose a Date:</label>
          <br />
          <input
            type="date"
            id="date"
            name="date"
            placeholder="2020-07-23"
            min="2020-07-01"
            max="2020-11-03"
          ></input>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <div></div>
      </section>
    </div>
  );
}

export default App;
