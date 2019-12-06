// const db = require("../database/db-config.js");

// module.exports = {
//   add,
//   find,
//   findBy,
//   findById
// };

// function find() {
//   return db("users").select("id", "username");
// }

// function findBy(filter) {
//   return db("users")
//     .select("id", "username", "password")
//     .where(filter);
// }

// function add(user) {
//   return db("users")
//     .insert(user, "id")
//     .then(ids => {
//       const [id] = ids;
//       return findById(id);
//     });
// }

// function findById(id) {
//   return db("users")
//     .select("id", "username")
//     .where({ id })
//     .first();
// }
const db = require("./dbConfig.js");

module.exports = {
  findBy,
  find,
  add
};

function add(user) {
  return db("users").insert(user);
}

function find() {
  return db("users").select("*");
}

function findBy(filter) {
  return db("users").where(filter);
}
