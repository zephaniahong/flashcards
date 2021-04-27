const jsSHA = require('jssha');

const shaObj1 = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
const shaObj2 = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
const shaObj3 = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
const shaObj4 = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
shaObj1.update('jim');
shaObj2.update('jack');
shaObj3.update('bob');
shaObj4.update('daniel');
const jimHashedPassword = shaObj1.getHash('HEX');
const jackHashedPassword = shaObj2.getHash('HEX');
const bobHashedPassword = shaObj3.getHash('HEX');
const danielHashedPassword = shaObj4.getHash('HEX');
module.exports = {
  up: async (queryInterface) => {
    // Define category data
    const users = [
      {
        name: 'Jim',
        email: 'jim@gmail.com',
        password: jimHashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Jack',
        email: 'jack@gmail.com',
        password: jackHashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Bob',
        email: 'bob@gmail.com',
        password: bobHashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Daniel',
        email: 'daniel@gmail.com',
        password: danielHashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', users);
  },
  down: async (queryInterface) => {
    // Delete rows from tables with foreign key references first
    await queryInterface.bulkDelete('users', null, {});
  },
};
