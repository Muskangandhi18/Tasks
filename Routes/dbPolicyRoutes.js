const express = require('express');
const { getPolicies, addPolicy,deletePolicy} = require('../controllers/dbpolicyController');
const router = express.Router();

router.get('/policy', getPolicies);  // Route to fetch users
router.post('/policy', addPolicy); // Route to add a new user
router.delete('/policy/:id',deletePolicy);

module.exports = router;
