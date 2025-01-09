const { getPolicies, savePolicies } = require("../models/policyModel");

const getAllPolicies = (req, res) => {
  const policies = getPolicies();
  res.json(policies);
};

const addPolicy = (req, res) => {
  const policies = getPolicies();
  policies.push(req.body);
  savePolicies(policies);
  res.status(201).send("Policy added successfully");
};

module.exports = { getAllPolicies, addPolicy };
