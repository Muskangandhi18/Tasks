const express = require('express');
const { getUsers, addUser } = require('../controllers/dbController');
const { validateUser } = require("../middlewares/validateUser");
const { loginUser } = require('../controllers/login');
const router = express.Router();

router.post("/login", loginUser)

router.get('/users', getUsers);  // Route to fetch users
router.post('/users', validateUser,addUser); // Route to add a new user

module.exports = router;
