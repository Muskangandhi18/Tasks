const sql = require('mssql');

const usersTable = async () => {
  const query=`IF NOT EXISTS (
    SELECT * 
    FROM sysobjects 
    WHERE name = 'MUsers' AND xtype = 'U'
)
BEGIN
    CREATE TABLE MUsers (
        id UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
        name NVARCHAR(255) NOT NULL,
        email NVARCHAR(255) NOT NULL UNIQUE,
        password NVARCHAR(15) NOT NULL
    );
END;
`

 
  try {
    await sql.query(query); // Execute the query
    console.log('Users Table created successfully!');
  } catch (err) {
    console.error('Error creating users table:', err.message);
  }
};

module.exports = usersTable;





