exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Carmen", password: "lambda1" },
        { username: "Salley", password: "lambda2" },
        { username: "Bonnie", password: "lambda3" }
      ]);
    });
};
