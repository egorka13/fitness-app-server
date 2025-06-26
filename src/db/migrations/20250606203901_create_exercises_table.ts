import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('exercises', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('title').notNullable();
    table.string('group').notNullable();
    table.boolean('isPopular').nullable();
    table.boolean('isDoubleSided').nullable();
    table.boolean('isNoWeight').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('exercises');
}
