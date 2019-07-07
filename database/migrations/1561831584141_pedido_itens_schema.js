"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PedidoItensSchema extends Schema {
  up() {
    this.create("pedido_itens", table => {
      table.increments();
	  table
        .integer("pedido_id")
        .unsigned()
        .references("id")
        .inTable("pedidos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
	  table
		.integer("produto_id")
	    .unsigned()
        .references("id")
        .inTable("produtos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
	   table
		.integer("produto_tipo_id")
	    .unsigned()
        .references("id")
        .inTable("tipos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");	
      table
		.integer("produto_tamanho_id")
	    .unsigned()
        .references("id")
        .inTable("tamanhos")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("titulo").notNullable();
      table.string("tamanho").notNullable();
      table.decimal("valor").notNullable();
      table.string("imagem").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("pedido_itens");
  }
}

module.exports = PedidoItensSchema;
