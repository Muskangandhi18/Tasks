const fs = require("fs");
const filePath = "./data/policy.txt";

const getPolicies = () => JSON.parse(fs.readFileSync(filePath, "utf8"));
const savePolicies = (policies) =>
  fs.writeFileSync(filePath, JSON.stringify(policies, null, 2));

module.exports = { getPolicies, savePolicies };
