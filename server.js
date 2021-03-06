const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const projects = require("./routes/api/projects");
const tasks = require("./routes/api/tasks");

require("dotenv").config();

const app = express();

  // DB Config
const db = require("./config/keys").mongoURI;

mongoose.connect(db, { 
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false } )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/projects", projects);
app.use("/api/tasks", tasks);

// Serve static assets (build folder) if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
 app.use(express.static("client/build"));
  
 app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
 });
}
  
const PORT = process.env.PORT || 5000;
  
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT} !`);
});