const express = require("express");
const {
  getAllPolicies,
  addPolicy,
} = require("../controllers/policyController");

const router = express.Router();

// Custom validation logic for policies
const validatePolicy = (req, res, next) => {
  const { policyId, policyName, premium } = req.body;

  if (!policyId || typeof policyId !== "string") {
    return res
      .status(400)
      .json({ error: 'Invalid or missing "policyId". It must be a string.' });
  }

  if (!policyName || typeof policyName !== "string") {
    return res
      .status(400)
      .json({ error: 'Invalid or missing "policyName". It must be a string.' });
  }

  if (!premium || typeof premium !== "number" || premium <= 0) {
    return res
      .status(400)
      .json({
        error: 'Invalid or missing "premium". It must be a positive number.',
      });
  }

  next(); // Proceed if validation passes
};

// Route definitions
router.get("/", getAllPolicies);
router.post("/", validatePolicy, addPolicy);

module.exports = router;
