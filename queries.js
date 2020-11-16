const Pool = require("pg").Pool;
const connectionString =
  "postgres://vtusuoswhkgfck:a84c0194b26b60817932b88867436ab389bf705dc5d48611678b14f7ca1ec8b0@ec2-100-25-100-81.compute-1.amazonaws.com:5432/d6cqoi6r59uhul?ssl=true";

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

module.exports = {
  getStates,
  getStatesMapInfo,
};
