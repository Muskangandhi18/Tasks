const sql = require('mssql');

const createPoliciesTable = async () => {
    const query = `IF NOT EXISTS (
        SELECT * 
        FROM sysobjects 
        WHERE name = 'MPolicy' AND xtype = 'U'
    )
    BEGIN
        CREATE TABLE MPolicy (
            policyId UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
            policyName NVARCHAR(255) NOT NULL,
            premium DECIMAL(10, 2) NOT NULL,
            duration INT NOT NULL
        );
    END;`
    

 
  try {
    await sql.query(query); // Execute the query
    console.log('Policy Table created successfully!');
  } catch (err) {
    console.error('Error creating Policies table:', err.message);
  }
};

module.exports = createPoliciesTable;

