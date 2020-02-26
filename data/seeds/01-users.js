exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'cam', password: 'mac', department: 'IT'},
        {username: 'sam', password: 'mas', department: 'Service'},
        {username: 'sarah', password: 'haras', department: 'Sales'},
        {username: 'bob', password: 'bob', department: 'Supplies'}
      ]);
};
