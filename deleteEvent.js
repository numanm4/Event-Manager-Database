const sql = require('mssql');

const config = {
  user: " ",// add your database username 
  password: " ", // add your database password
  database: " ", // add your database name
  server: "localhost", // this is for when the project is running on your local computer
  options: {
    trustServerCertificate: true // change to false for production
  }
};

const deleteData = async (eventName, callback) => {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    request.input('eventName', sql.NVarChar, eventName);

    const query = `
      DELETE FROM Events
      WHERE eventName = @eventName
    `;

    await request.query(query);
    callback(null);

  } catch (err) {
    console.error('Error while deleting data:', err);
    callback(err);
  }
};

module.exports = {
  deleteData,
};
