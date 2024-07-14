import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 3000;

const dbPassword = process.env.DB_PASSWORD;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: dbPassword,
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
      res.render("register.ejs", { message: "User already exists" });
    } else {
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
      res.render("secrets.ejs");
    }
  } catch (err) {
    console.log(err);
    res.render("register.ejs", { message: "An error occurred, please try again." });
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length > 0) {
      if (result.rows[0].password === password) {
        res.render("secrets.ejs");
      } else {
        res.render("login.ejs", { message: "Incorrect password" });
      }
    } else {
      res.render("login.ejs", { message: "Incorrect username" });
    }
  } catch (err) {
    console.log(err);
    res.render("login.ejs", { message: "An error occurred, please try again." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
