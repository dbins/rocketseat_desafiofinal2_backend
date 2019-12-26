"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class LogProdutoSchema extends Schema {
  up() {
    this.create("log_produtos", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
	  table.string("pesquisa", 100).nullable();
      table.integer("produto_id");
      table.integer("produto_tipo_id");
      table.integer("produto_tamanho_id");
      table.timestamps();
    });
  }

  down() {
    this.drop("log_produtos");
  }
}

module.exports = LogProdutoSchema;
