// const { getUsers, saveUsers } = require("../models/userModel");

// const getAllUsers = (req, res) => {
//   const users = getUsers();
//   res.json(users);
// };

// const addUser = (req, res) => {
//   const users = getUsers();
//   users.push(req.body);
//   saveUsers(users);
//   res.status(201).send("User added successfully");
// };

// const getProfile = (req, res) => {
//   // Access user information from `req.user` (set in middleware)
//   const user = req.user;
//   if (!user) {
//     return res.status(404).json({ error: "User not found." });
//   }
//   res.json({ message: "User profile retrieved successfully.", user });
// };
// const getUsersJson=async(req,res)=>{
//   let cacheValue=await client.get("users");
//   if(cacheValue) return  res.json(cacheValue);
//   let response=await fetch("https://jsonplaceholder.typicode.com/users");
//   let data=await response.json();
//   await client.set("users",JSON.stringyfy(data));
//   await client.expire("users",120);
//   return res.join(data);
// };
// module.exports = { getAllUsers, addUser, getProfile };

// const { getUsers, saveUsers } = require("../models/userModel");

// const getAllUsers = (req, res) => {
//   const users = getUsers();
//   res.json(users);
// };

// const addUser = (req, res) => {
//   const users = getUsers();
//   users.push({ ...req.body, id: users.length + 1 }); // Assign unique ID
//   saveUsers(users);
//   res.status(201).send("User added successfully");
// };

// const deleteUser = (req, res) => {
//   const { id } = req.params;
//   let users = getUsers();
//   const userIndex = users.findIndex((user) => user.id == id);

//   if (userIndex === -1) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   users.splice(userIndex, 1); // Remove the user
//   saveUsers(users);
//   res.status(200).send("User deleted successfully");
// };

// module.exports = { getAllUsers, addUser, deleteUser };
const { v4: uuidv4 } = require("uuid"); // Import uuid
const { getUsers, saveUsers } = require("../models/userModel");

const getAllUsers = async(req, res) => {
  const users = await getUsers();
  console.log("users", users);
  res.json(users);
};

const addUser = (req, res) => {
  const users = getUsers();
  const newUser = { ...req.body, id: uuidv4() }; // Generate a unique ID
  users.push(newUser);
  saveUsers(users);
  res.status(201).send("User added successfully");
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  let users = getUsers();
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(userIndex, 1); // Remove the user
  saveUsers(users);
  res.status(200).send("User deleted successfully");
};

module.exports = { getAllUsers, addUser, deleteUser };
