/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { username: "user1", password: "123" },
    { username: "user2", password: "123" },
    { username: "user3", password: "123" },
  ]);
};
