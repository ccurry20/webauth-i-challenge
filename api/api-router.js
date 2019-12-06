const router = require("express").Router();
const bcrypt = require("bcryptjs");
const db = require("./api-model.js");
const restricted = require("../auth/auth-required-middleware.js");

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    db.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          res.status(200).json({ message: `welcome ${username}` });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err });
      });
  }
});

router.post("/register", (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  db.add(user).then(added => res.status(201).json(added));
});

router.get("/users", restricted, (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: `Internal Server Error: ${err}` });
    });
});

module.exports = router;
