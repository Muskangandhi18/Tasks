const express = require("express");
require("dotenv").config();
const dbRoutes = require("./Routes/dbRoutes");
const muserPolicyRoutes = require('./Routes/MUserPolicyRoutes'); // Adjust the path as needed
// const userRoutes = require("./Routes/userRoutes");
// const policyRoutes = require("./Routes/policyRoutes");
const dbPolicyRoutes = require("./Routes/dbPolicyRoutes");
const connectDB = require("./config/db");
const createPolicyTable = require('./config/policyTable'); // Import the create table function
const usersTable = require('./config/usersTable'); // Import the create table function
const createUserPolicyTable = require('./config/userPolicyTable'); // Import the create table function
const authenticateUser = require("./middlewares/auth");
// const dropTable=require('./models/dropTable');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
const initializeApp = async () => {
  try {
    await connectDB(); // Establish the database connection
    await usersTable();
    await createPolicyTable(); // Create the table
    await createUserPolicyTable(); // Create the table
    
    // await dropTable();
   
    console.log("Database connected successfully!");
    
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
    });
  } catch (error) {
    console.error("Error initializing app:", error.message);
    process.exit(1); // Exit the process if DB connection fails
  }
};

// Routes
app.use("/users", dbRoutes);
app.use("/policy", authenticateUser, dbPolicyRoutes);
app.use('/userPolicy', muserPolicyRoutes); // Use the MUserPolicy routes
// app.use("/users",userRoutes);
// app.use("/policies", policyRoutes);

// Initialize the application
initializeApp();
