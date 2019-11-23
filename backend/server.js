const express = require("express");
const app = express();
const bcrypt = require("bcrypt-nodejs");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "smart-brain"
  }
});
db.select("*").from("users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const database = {
  users: [
    {
      id: "123",
      name: "Felicia",
      email: "LiciaObi@gmail.com",
      password: "abacha",
      entries: 0,
      joined: new Date()
    },
    {
      id: "456",
      name: "Endurance",
      email: "endurance@gmail.com",
      password: "canteen",
      entries: 0,
      joined: new Date()
    }
  ],
  login: {
    id: "967",
    hash: "",
    email: "endurance@gmail.com"
  }
};

app.get("/", (req, res) => {
  res.send(database.users);
});
//sign In
app.post("/signin", (req, res) => {
  /* bcrypt.compare(
    "Stingon",
    "$2a$10$UWGW/mzPFvmY7XVZqXa2Q.vGtHnO07.ksYmaBe1ENNdM2l7q1wI2m",
    function(err, res) {
      // res == true
      console.log(res);
    }
  );
  bcrypt.compare(
    "veggies",
    "$2a$10$UWGW/mzPFvmY7XVZqXa2Q.vGtHnO07.ksYmaBe1ENNdM2l7q1wI2m",
    function(err, res) {
      // res = false
      console.log(res);
    } 
  );*/
  if (
    req.body.email === database.users[0].email &&
    req.body.password === database.users[0].password
  ) {
    res.json(database.users[0]);
  } else {
    res.status(400).json("Email Or Password not correct");
  }
});

//register
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password);
  //insert a new user to the postgresql db
  //using knex transactions
  db.transaction(trx => {
    trx
      .insert({
        hash: hash,
        email: email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({
            name: name,
            email: loginEmail[0].toLowerCase(),
            joined: new Date()
          })
          .then(user => {
            console.log(user);
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err => res.status(400).json("Unable to Register"));
});

// route for specific users
app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db("users")
    .where("id", id)
    .then(user => {
      console.log(user, "user");
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Not Found");
      }
    })
    .catch(err => console.log("error getting user", err));
});
//updating image
//my path = C:\Program Files\PostgreSQL\11\bin
//old path just if things do not work = %SystemRoot%\system32;%SystemRoot%;%SystemRoot%\System32\Wbem;%SYSTEMROOT%\System32\WindowsPowerShell\v1.0\;C:\Program Files (x86)\Brackets\command;C:\Program Files\Microsoft VS Code\bin;C:\Program Files\nodejs\
app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment({
      entries: 1
    })
    .returning("entries")
    .then(entry => {
      res.json(entry[0]);
    })
    .catch(err => {
      res.status(400).json("unable to update entries");
    });
  /* 
  let found = false;
  database.users.map(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    return res.status(400).json("Not Found");
  } */
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
