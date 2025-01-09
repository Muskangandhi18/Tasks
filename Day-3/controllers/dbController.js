const sql = require('mssql');
// Fetch and display user data from the database
const getUsers = async (req, res) => {
    try {
      const result = await sql.query('SELECT * FROM MUsers'); // Query the Users table
      res.json(result.recordset); // Send the fetched data as JSON
    } catch (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).send('Server Error');
    }
  };
  
  

// Handle POST request to add a new user
const addUser = async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const query = `
      INSERT INTO MUsers (name, email, password)
      VALUES (@name, @email, @password)
    `;
    const request = new sql.Request();
    request.input('name', sql.NVarChar, name);
    request.input('email', sql.NVarChar, email);
    request.input('password', sql.NVarChar, password);

    await request.query(query);
    res.status(201).send('User added successfully');
  } catch (err) {
    console.error('Error adding data:', err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getUsers, addUser };
