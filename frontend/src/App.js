import "./App.css";
import MapChart from "./components/MapChart";

function App() {
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
            <a href="#Submit a Case or Death">Submit a Case or Death</a>
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
          View county-specific information including population, and
          state-specific coronavirus information
        </p>
        <MapChart />
      </section>

      <section id="Reports">
        <h2>Reports</h2>
        <p>Read the daily COVID-19 reports by state</p>
        <form>
          <label for="state">Choose a State:</label>
          <br />
          <select name="state" id="state">
            <option value="1">Alabama</option>
            <option value="27">Nebraska</option>
            <option value="35">Ohio</option>
          </select>
          <br />
          <label for="date">Choose a Date:</label>
          <br />
          <input
            type="date"
            id="date"
            name="date"
            placeholder="2020-07-23"
            min="2020-01-22"
            max="2020-11-03"
          ></input>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </section>

      <section id="Submit a Case or Death">
        <h2>Submit a Case or Death</h2>
        <p>
          Submit a coronavirus case or death in order for it to be included on
          future reports
        </p>
        <form>
          <label for="name">Name:</label>
          <br />
          <input type="text" id="name" name="name" placeholder="John Doe" />
          <br />
          <label for="age">Age:</label>
          <br />
          <input type="number" id="age" name="age" placeholder="22" min="0" />
          <br />
          <label for="state">Choose Your State:</label>
          <br />
          <select name="state" id="state">
            <option value="1">Alabama</option>
            <option value="27">Nebraska</option>
            <option value="35">Ohio</option>
          </select>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
}

export default App;
