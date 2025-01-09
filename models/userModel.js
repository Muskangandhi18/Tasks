const fs = require("fs");
const filePath = "./data/users.txt";

const getUsers = () => JSON.parse(fs.readFileSync(filePath, "utf8"));
const saveUsers = (users) =>
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

module.exports = { getUsers, saveUsers };
