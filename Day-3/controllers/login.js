const jwt = require("jsonwebtoken");

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials (mock example)
  if (email === "muskan3@gmail.com" && password === "password123") {
    // Generate JWT
    const token = jwt.sign({ id: 1, email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token)
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials." });
  }
};

module.exports = { loginUser };
