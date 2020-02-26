const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  return cleaner.clean(knex, {
    // resets ids
    mode: 'truncate',
    // don't empty migration tables
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'], 
  });
};