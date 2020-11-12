const Pool = require("pg").Pool;
const connectionString =
  "postgres://vtusuoswhkgfck:a84c0194b26b60817932b88867436ab389bf705dc5d48611678b14f7ca1ec8b0@ec2-100-25-100-81.compute-1.amazonaws.com:5432/d6cqoi6r59uhul?ssl=true";

// Sets up the credentials to access the database
const pool = new Pool({
  connectionString,
});

// First required query
const getStates = (request, response) => {
  pool.query(`SELECT * from "states"`, (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getStates,
};
