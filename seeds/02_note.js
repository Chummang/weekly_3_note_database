/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("note").del();
  await knex("note").insert([
    { content: "note one", user_id: 1 },
    { content: "note two", user_id: 1 },
    { content: "just testing", user_id: 2 },
  ]);
};
