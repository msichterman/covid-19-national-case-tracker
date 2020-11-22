# COVID-19 National Case Tracker

## About the project
### Overview
Visualize COVID-19 data for states across the United States including which have been most susceptible to the coronavirus, specific time series data pertaining to cases and deaths by state, and political party affiliation. Utilize database techniques discussed in class and apply them to a modern web application.

### Goals
* Primary Goals
    * Visualize COVID cases as they rise throughout the US
    * Analyze trends and showcase which states have been most susceptible to the coronavirus
    * Determine areas most impacted by the pandemic
Secondary Goal
    * Visualize potential relationships between state governors’ party affiliations and COVID cases over time

### Data set
* Utilized the data from https://data.world/associatedpress/johns-hopkins-coronavirus-case-tracker
* Data included time series data of cases and deaths by states, county level confirmed cases, and time series data of cases and deaths by county
    * Leveraged the the time series data of cases and deaths by state
    * Only leveraged general information about counties
* Limited the time frame of our data between July 1, 2020 and November 3, 2020 in order to have a more manageable data set.
* Supplemented our COVID-19 data with governor information per state and their political parties

### Database design
#### Five entities
State, County, Report, Governor, Party

#### ER diagram:
<img src="https://github.com/msichterman/covid-19-national-case-tracker/blob/main/other-files/COVID-19-ER-Diagram.png" alt="ER Diagram" />

#### States table sample
<img src="https://github.com/msichterman/covid-19-national-case-tracker/blob/main/other-files/states_sample.png" alt="States table sample" />
#### Counties table sample
<img src="https://github.com/msichterman/covid-19-national-case-tracker/blob/main/other-files/counties_sample.png" alt="Counties table sample" />
#### Reports table sample
<img src="https://github.com/msichterman/covid-19-national-case-tracker/blob/main/other-files/reports_sample.png" alt="Reports table sample" />
#### Governors table sample
<img src="https://github.com/msichterman/covid-19-national-case-tracker/blob/main/other-files/governors_sample.png" alt="Governors table sample" />
#### Parties table sample
<img src="https://github.com/msichterman/covid-19-national-case-tracker/blob/main/other-files/parties_sample.png" alt="Parties table sample" />

### User functionality
1. Given a date, get state information to populate the map and later calculate the amount of covid cases for each states’ population (as a percentage)
2. Given a state and a date, get the report including COVID-19 cases and deaths
3. Given a political party, get the amount of covid cases for the population (as a percentage)
4. Given a state and a date, what are the average cases per county (not shown in our web app)

### Implementation
* Utilize modern technologies to showcase topics learned in class
    * React frontend
        * Deployed on AWS
    * Node.js (via Express.js) API
        * Deployed on Heroku
    * PostgreSQL database
        * Deployed on Heroku
* Leverage COVID-19 time series data in order to show trends over time
* Use various queries to give our users the ability to control visualizations and gain meaningful insights

### Presentation recording
A link to the recording of our presentation can be found [here](https://youtu.be/24b4R3fFOcY)!

## Files in this repository
* The root `/` folder is home to the backend Express.js code
    * `server.js` is the main entry point to the API
    * `queries.js` houses the queries used in the application
* The `/frontend` folder is home to the the frontend React code
    * `App.js` stores most of the frontend code
* The `/database` folder is home to the database files including the `.sql` database structure and the `.csv` files used to populate the database.
* The `/other-files` folder is home to the presentation slides (in `.pdf` and `.pptx`) and ER diagram.

## See it live!
The web application can be seen at https://csce-413.msich.dev/

## Run it locally
In order to use the application locally, you'll need to do a few things first.

1. Clone this repository and `cd` into the repository's directory
```
git clone https://github.com/msichterman/covid-19-national-case-tracker.git && cd ./covid-19-national-case-tracker
```

2. Install all of the `node_modules` required for the project. Depending on your computer's configuration, you may need to prefix this command with a `sudo`.
```
npm run dev-install
```
or
```
sudo npm run dev-install
```

3. Lastly, run the following command to get the project off the ground. This command will not only build your JS files, but it will also auto-compile your files on every file save. This allows for hot reloading on-save when the backend and/or frontend code is updated.

```
npm run dev
```

4. Head over to [http://localhost:3000](http://localhost:3000) to see the frontend application live! The backend API should be running at [http://localhost:8080](http://localhost:8080).

**Note:** If you receive an error about the CORS configuration, simply go to the `server.js` file and replace line 9 with the following:
```javascript
res.header("Access-Control-Allow-Origin", "http://localhost:3000");
```

## Contributors
* [Matt Sichterman](https://msich.dev/)
* [Easton Joachimsen](https://github.com/eastonray9)
* [Ryan Le](https://ryanle.dev/)
* [Christian Berck](https://github.com/cberck4)
