// const express = require("express");
// // const {
// //   getAllUsers,
// //   addUser,
// //   getProfile,
// // } = require("../controllers/userController");

// const {getAllUsers,addUser,getProfile}= require('../controllers/userController')
// // const validateInput = require("../middlewares/validateInput");
// const { validateUser } = require("../middlewares/validateUser");
// const authenticateUser = require("../middlewares/auth");
// const { loginUser } = require("../controllers/login");
// const {usersJson}=require("../controllers/userController")

// const router = express.Router();

// router.get("/", getAllUsers);
// router.post("/", validateUser, addUser);
// router.post("/login", loginUser);

// // Protected Route

// router.get("/userinfo", authenticateUser, getProfile);

// module.exports = router;
const express = require("express");
const { getAllUsers, addUser, deleteUser } = require("../controllers/userController");
const { validateUser } = require("../middlewares/validateUser");
const { loginUser } = require("../controllers/login");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", validateUser, addUser);
router.delete("/:id", deleteUser);

module.exports = router;
