export async function up(knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.boolean("completed").defaultTo(false);
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("tasks");
}
