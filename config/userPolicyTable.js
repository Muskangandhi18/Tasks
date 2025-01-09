const sql = require('mssql');
const createUserPolicyTable = async () => {
    const query = `
        IF NOT EXISTS (
            SELECT * 
            FROM sysobjects 
            WHERE name = 'MUserPolicy' AND xtype = 'U'
        )
        BEGIN
            CREATE TABLE MUserPolicy (
                OrderId UNIQUEIDENTIFIER DEFAULT NEWID() PRIMARY KEY,
                id UNIQUEIDENTIFIER NOT NULL,
                policyId UNIQUEIDENTIFIER NOT NULL,
                date DATE DEFAULT GETDATE() NOT NULL,
                FOREIGN KEY (id) REFERENCES MUsers(id),
                FOREIGN KEY (policyId) REFERENCES MPolicy(policyId)
            );
            
        END;
    `

    try {
        await sql.query(query); // Execute the query
        console.log('User Policy Table created successfully!');
    } catch (err) {
        console.error('Error creating User Policies table:', err.message);
    }
};

module.exports = createUserPolicyTable;
