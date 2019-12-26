"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TipoSchema extends Schema {
  up() {
    this.create("tipos", table => {
      table.increments();
      table.string("titulo").notNullable();
	  table.string("descricao").notNullable();
      table
        .integer("produto_id")
        .unsigned()
        .references("id")
        .inTable("produtos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("file_id")
        .unsigned()
        .references("id")
        .inTable("files")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("tipos");
  }
}

module.exports = TipoSchema;
