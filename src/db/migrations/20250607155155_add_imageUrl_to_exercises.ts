import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('exercises', (table) => {
    table.string('imageUrl').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('exercises', (table) => {
    table.dropColumn('imageUrl');
  });
}
