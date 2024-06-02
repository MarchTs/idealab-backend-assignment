import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('influencer', (table) => {
        table.uuid('id').primary();
        table.uuid('account_id');
        table.string('name').notNullable();
        table.string('platform').notNullable();
        table.string('sex').notNullable();
        table.specificType('categories', 'text ARRAY').notNullable();
        table.string('tel').notNullable();
        table.string('link').notNullable();
        table.integer('followers').notNullable();
        table.integer('photo_cost_kols').notNullable();
        table.integer('vdo_cost_kols').notNullable();
        table.float('er').notNullable();
        table.dateTime('created_at').defaultTo(knex.fn.now());
        table.dateTime('updated_at').defaultTo(knex.fn.now());
        table.enum('status', ['active', 'inactive']).defaultTo('active');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('influencer');
}
