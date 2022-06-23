const Pool = require("pg").Pool;
const connectionString =
  "postgres://btniytufxakmvh:57455d8da4aa1ebc2818cb500643f42e88bd1802eb4b7d280c672cbd6ad8a88b@ec2-54-82-191-247.compute-1.amazonaws.com:5432/d5t0m06tkf3e9a?ssl=true";

// Sets up the credentials to access the database
const pool = new Pool({
  connectionString,
});

// Get list of all states data
const getStates = (request, response) => {
  pool.query(`SELECT id, name FROM states`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getStatesMapInfo = (request, response) => {
  pool.query(
    `
SELECT states.id, states.name, states.population, states.abbreviation, reports.cumulative_cases FROM states
INNER JOIN reports ON states.id = reports.state_id
WHERE reports.date = '${request.query.date}'
`,
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getStateReport = (request, response) => {
  pool.query(
      `
SELECT cumulative_cases, new_cases, cumulative_deaths, new_deaths
FROM reports 
WHERE state_id = ${request.query.state} and date = '${request.query.date}'
`,
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
  );
};

const getPartyReport = (request, response) => {
  pool.query(
      `
SELECT ((
SELECT CAST(sum(cumulative_cases) AS FLOAT) 
FROM reports 
WHERE date = '${request.query.date}' AND 
state_id IN (
SELECT state_id 
FROM governors 
WHERE party_id = 1)
) / (
\t\tSELECT CAST(sum(population) AS FLOAT) 
FROM states 
WHERE id IN (
SELECT state_id FROM governors where party_id = ${request.query.party})
) * 100) as percent

`,
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
  );
};

module.exports = {
  getStates,
  getStatesMapInfo,
  getStateReport,
  getPartyReport
};
