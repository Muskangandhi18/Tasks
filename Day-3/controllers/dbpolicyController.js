const sql = require('mssql');

// Fetch all policies
const getPolicies = async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Policies');
    res.json(result.recordset); // Return the list of policies as JSON
  } catch (err) {
    console.error('Error fetching policies:', err.message);
    res.status(500).send('Server Error');
  }
};

// Add a new policy
const addPolicy = async (req, res) => {
  const { policyName, premium, duration } = req.body;

  if (!policyName || !premium || !duration) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const query = `
      INSERT INTO MPolicy(policyName, premium, duration)
      VALUES (@policyName, @premium, @duration)
    `;
    const request = new sql.Request();
    request.input('policyName', sql.NVarChar, policyName);
    request.input('premium', sql.Float, premium);
    request.input('duration', sql.Int, duration);

    await request.query(query);
    res.status(201).json({ message: 'Policy added successfully' });
  } catch (err) {
    console.error('Error adding policy:', err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a policy by ID
const deletePolicy = async (req, res) => {
    const { id } = req.params;
  
    try {
      const query = 'DELETE FROM Policies WHERE policyId = @id';
      const request = new sql.Request();
      request.input('id', sql.UniqueIdentifier, id); // Ensure UniqueIdentifier
  
      const result = await request.query(query);
  
      if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ error: 'Policy not found' });
      }
  
      res.status(200).json({ message: 'Policy deleted successfully' });
    } catch (err) {
      console.error('Error deleting policy:', err.message);
      res.status(500).send('Server Error');
    }
  };
  
module.exports = {
  getPolicies,
  addPolicy,
  deletePolicy,
};
