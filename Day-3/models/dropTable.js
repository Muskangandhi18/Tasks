const sql = require('mssql');

const dropPolicyTable = async () => {
  const query = `
    DROP TABLE Policies
  `;

  try {
    await sql.query(query); // Execute the query
    console.log('Policy Table deleted successfully!');
  } catch (err) {
    console.error('Error deleting Policies table:', err.message);
  }
};

module.exports = dropPolicyTable;
