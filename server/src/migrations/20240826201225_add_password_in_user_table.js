export async function up(knex) {
  return knex.schema.table("users", (table) => {
    table.string("password").notNullable();
  });
}

export async function down(knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("password");
  });
}
