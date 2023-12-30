const sql = require('mssql');

// Config for your database
const config = {
  user: " ",// add your database username 
  password: " ", // add your database password
  database: " ", // add your database name
  server: "localhost", // this is for when the project is running on your local computer
  options: {
    trustServerCertificate: true // change to false for production
  }
  };

// connect to your database
const searchEvents = async (eventName) => {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('eventName', sql.NVarChar, eventName)
      .query('SELECT * FROM events WHERE eventName = @eventName');
    
    return result.recordset;
  } catch (err) {
    console.error('SQL error', err);
    throw new Error('An error occurred while querying the database');
  }
}

module.exports = {searchEvents};
