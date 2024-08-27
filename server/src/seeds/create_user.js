export async function seed(knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { name: "Samir", email: "samir@gmail.com" },
    { name: "Nabin", email: "nabin@test.com" },
    { name: "Ashwin", email: "test@test.com" },
  ]);
}
