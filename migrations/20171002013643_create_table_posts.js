
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('posts', function (table) {
            table.increments('id').primary();
            table.integer('user_id').references('users.id');
            table.string('title');
            table.string('subtitle');
            table.text('body');
            table.string('chunk');
            table.timestamps();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('posts')
    ]);
};
