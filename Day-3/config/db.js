const sql = require('mssql')

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
//   pool: {
//     max: 10,
//     min: 0,
//     idleTimeoutMillis: 30000
//   },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}


   const connectDB = async () => {
    try {
      // Establish the database connection
      await sql.connect(sqlConfig);
      console.log('Connected to SQL Server');
    } catch (err) {
      console.error('Database connection error:', err.message);
      process.exit(1); // Exit the application if unable to connect
    }
  };
 
  module.exports = connectDB;