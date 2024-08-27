export async function seed(knex) {
  await knex("notes").del();
  await knex("notes").insert([
    { title: "First Note", content: "This is the first note", user_id: 1 },
    { title: "Second Note", content: "This is the second note", user_id: 1 },
    { title: "Third Note", content: "This is the third note", user_id: 2 },
    { title: "Fourth Note", content: "This is the fourth note", user_id: 2 },
    { title: "Fifth Note", content: "This is the fifth note", user_id: 3 },
    { title: "Sixth Note", content: "This is the sixth note", user_id: 3 },
  ]);
}
