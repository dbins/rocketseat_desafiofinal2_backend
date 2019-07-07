"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class TamanhoSchema extends Schema {
  up() {
    this.create("tamanhos", table => {
      table.increments();
      table.string("titulo").notNullable();
      table.decimal("valor").notNullable();
      table
        .integer("produto_tipo_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tipos")
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
    this.drop("tamanhos");
  }
}

module.exports = TamanhoSchema;
