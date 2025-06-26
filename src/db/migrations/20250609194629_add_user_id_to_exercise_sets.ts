import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('exercise_sets', (table) => {
    table
      .uuid('userId')
      .notNullable()
      .references('id')
      .inTable('auth.users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('exercise_sets', (table) => {
    table.dropColumn('userId');
  });
}
