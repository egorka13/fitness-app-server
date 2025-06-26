import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('exercise_sets', (table) => {
    table.increments('id').primary();
    table
      .integer('exerciseId')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('exercises') // foreign key to exercises table
      .onDelete('CASCADE'); // on delete cascade to remove sets if the exercise is deleted
    table.integer('reps').notNullable();
    table.decimal('weight').notNullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('exercise_sets');
}
