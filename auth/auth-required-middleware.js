const users = require("../api/api-model.js");
const bcrypt = require("bcryptjs");

module.exports = (req, res, next) => {
  // look for the credentials
  const { username, password } = req.headers;

  users
    .findBy({ username })

    .first()
    .then(_user => {
      if (_user && bcrypt.compareSync(password, _user.password)) {
        next();
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    // if there is a DB problem... or other problem on our end...
    .catch(err => {
      res.status(500).json({ message: err });
    });
};
