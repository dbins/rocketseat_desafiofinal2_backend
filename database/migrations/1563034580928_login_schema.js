"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LoginSchema extends Schema {
  up() {
    this.create("logins", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.string("sistema", 100).nullable();
      table.string("versao", 100).nullable();
      table.string("api", 100).nullable();
      table.string("marca", 100).nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("logins");
  }
}

module.exports = LoginSchema;
