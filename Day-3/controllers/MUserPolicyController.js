const sql = require('mssql');

// Controller for MUserPolicy operations
const MUserPolicyController = {
    // Create a new MUserPolicy record
    createMUserPolicy: async (req, res) => {
        const { id, policyId } = req.body;

        try {
            const query = `
                INSERT INTO MUserPolicy (id, policyId)
                VALUES (@id, @policyId)
            `;

            let pool = await sql.connect();
            await pool.request()
                .input('id', sql.UniqueIdentifier, id)
                .input('policyId', sql.UniqueIdentifier, policyId)
                .query(query);

            res.status(201).json({ message: 'MUserPolicy record created successfully.' });
        } catch (err) {
            console.error('Error creating MUserPolicy record:', err.message);
            res.status(500).json({ error: 'Error creating MUserPolicy record.' });
        }
    },

    // Fetch all MUserPolicy records
    getAllMUserPolicies: async (req, res) => {
        try {
            const query = 'SELECT * FROM MUserPolicy';
            let pool = await sql.connect();
            const result = await pool.request().query(query);

            res.status(200).json(result.recordset);
        } catch (err) {
            console.error('Error fetching MUserPolicy records:', err.message);
            res.status(500).json({ error: 'Error fetching MUserPolicy records.' });
        }
    },

    // Fetch a MUserPolicy record by OrderId
    getMUserPolicyByOrderId: async (req, res) => {
        const { orderId } = req.params;

        try {
            const query = 'SELECT * FROM MUserPolicy WHERE OrderId = @orderId';
            let pool = await sql.connect();
            const result = await pool.request()
                .input('orderId', sql.UniqueIdentifier, orderId)
                .query(query);

            if (result.recordset.length === 0) {
                res.status(404).json({ message: 'MUserPolicy record not found.' });
            } else {
                res.status(200).json(result.recordset[0]);
            }
        } catch (err) {
            console.error('Error fetching MUserPolicy record:', err.message);
            res.status(500).json({ error: 'Error fetching MUserPolicy record.' });
        }
    },

    // Update a MUserPolicy record
    updateMUserPolicy: async (req, res) => {
        const { orderId } = req.params;
        const { id, policyId } = req.body;

        try {
            const query = `
                UPDATE MUserPolicy
                SET id = @id, policyId = @policyId
                WHERE OrderId = @orderId
            `;

            let pool = await sql.connect();
            await pool.request()
                .input('orderId', sql.UniqueIdentifier, orderId)
                .input('id', sql.UniqueIdentifier, id)
                .input('policyId', sql.UniqueIdentifier, policyId)
                .query(query);

            res.status(200).json({ message: 'MUserPolicy record updated successfully.' });
        } catch (err) {
            console.error('Error updating MUserPolicy record:', err.message);
            res.status(500).json({ error: 'Error updating MUserPolicy record.' });
        }
    },

    // Delete a MUserPolicy record
    deleteMUserPolicy: async (req, res) => {
        const { orderId } = req.params;

        try {
            const query = 'DELETE FROM MUserPolicy WHERE OrderId = @orderId';

            let pool = await sql.connect();
            await pool.request()
                .input('orderId', sql.UniqueIdentifier, orderId)
                .query(query);

            res.status(200).json({ message: 'MUserPolicy record deleted successfully.' });
        } catch (err) {
            console.error('Error deleting MUserPolicy record:', err.message);
            res.status(500).json({ error: 'Error deleting MUserPolicy record.' });
        }
    },
};

module.exports = MUserPolicyController;
