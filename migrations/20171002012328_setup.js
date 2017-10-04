
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
        console.log("***", knex);
        table.increments('id').primary();
        table.string('username');
        table.string('role');
        table.string('password');
        table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ]);
};
