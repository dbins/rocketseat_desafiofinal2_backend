"use strict";
const User = use("App/Models/User");
/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class UserSeeder {
  async run() {
    const users = await User.all();

    if (!users.toJSON().length) {
      await User.create({
        username: "BINS",
        email: "bins.br@gmail.com",
        password: "123456",
        type: "ADMIN"
      });
    }
  }
}

module.exports = UserSeeder;
