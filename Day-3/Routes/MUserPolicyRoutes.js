const express = require('express');
const MUserPolicyController = require('../controllers/MUserPolicyController'); // Adjust the path as needed

const router = express.Router();

// Routes for MUserPolicy
router.post('/muserpolicy', MUserPolicyController.createMUserPolicy); // Create a new record
router.get('/muserpolicies', MUserPolicyController.getAllMUserPolicies); // Fetch all records
router.get('/muserpolicy/:orderId', MUserPolicyController.getMUserPolicyByOrderId); // Fetch a record by OrderId
router.put('/muserpolicy/:orderId', MUserPolicyController.updateMUserPolicy); // Update a record
router.delete('/muserpolicy/:orderId', MUserPolicyController.deleteMUserPolicy); // Delete a record

module.exports = router;
