import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import  env from "dotenv";
import bcrypt from "bcrypt";

env.config();
const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: process.env.DB_PASSWORD,
  database: "secrets",
  port: 5432
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { message: null });
});

app.get("/register", (req, res) => {
  res.render("register.ejs", { message: null });
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
      res.send("User already exists. Try logging in");
    } else {
      //Hashing Password
      bcrypt.hash(password, saltRounds, async(err, hash) => {
        if (err) {
          res.send("Error in hashing" + err);
        } else {
          await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, hash]);
          res.render("secrets.ejs");
        }  
      });
    }
  } catch (err) {
    console.log(err);
    res.render("register.ejs", { message: "An error occurred, please try again." });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      const storedPassword = result.rows[0].password;
      bcrypt.compare(loginPassword, storedPassword, (err, result) => {
        if (err) {
          console.log("Error comparing passwords", err);
        } else {
          if (result) {
            res.render("secrets.ejs");
          } else {
            res.send("Incorrect password");
          }
        }
      }); 
    } else {
      res.render("login.ejs", { message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.render("login.ejs", { message: "An error occurred, please try again." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});