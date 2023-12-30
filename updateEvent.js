const sql = require("mssql");

// Config for your database
const config = {
  user: " ",// add your database username 
  password: " ", // add your database password
  database: " ", // add your database name
  server: "localhost", // this is for when the project is running on your local computer
  options: {
    trustServerCertificate: true, // change to false for production
      encrypt: true,
    }
   
  };
  
  const updateData = async (eventData, callback) => {
    try {
      const pool = await sql.connect(config);
      const request = pool.request();
  
      request.input('eventName', sql.NVarChar, eventData.eventName); // Identifier for the event
      request.input('description', sql.NVarChar, eventData.description);
      request.input('eventDate', sql.Date, eventData.eventDate);
      request.input('eventTime', sql.NVarChar, eventData.eventTime);
      request.input('location', sql.NVarChar, eventData.location);
  
      const query = `
        UPDATE Events 
        SET [description] = @description, eventDate = @eventDate, eventTime = @eventTime, [location] = @location
        WHERE eventName = @eventName
      `;
  
      await request.query(query);
      callback(null);
    } catch (err) {
      console.error('Error Updating Data:', err);
      callback(err);
    }
  };
  
  module.exports = {
    updateData,
  };
  
