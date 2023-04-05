const sql = require('mssql');
const cron = require('node-cron');

// Configuration for connecting to the SQL Server database
const config = {
  user: 'your-username',
  password: 'your-password',
  server: 'your-server-address',
  database: 'your-database-name',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

async function runDatabaseQuery() {
  try {
    // Establish a connection to the database
    const pool = await sql.connect(config);

    // Write your SQL query here
    const result = await pool.request().query('SELECT * FROM your-table-name');

    // Log the result of the query
    console.log(result.recordset);
  } catch (err) {
    console.error('Error running the database query:', err);
  } finally {
    // Close the database connection
    await sql.close();
  }
}

// Schedule the database query to run every 30 minutes
cron.schedule('*/30 * * * *', runDatabaseQuery);
