"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PedidoSchema extends Schema {
  up() {
    this.create("pedidos", table => {
      table.increments();
      table.string("cep").notNullable();
      table.string("rua").notNullable();
      table.string("numero").notNullable();
      table.string("bairro").notNullable();
      table.string("cidade").notNullable();
      table.string("estado").notNullable();
      table.decimal("valor").notNullable();
      table.string("observacao").nullable();
      table.string("forma_pagamento").nullable();
      table.string("bandeira", 200).nullable();
      table.string("status", 200).notNullable();
      table.string("nsu", 200).notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("pedidos");
  }
}

module.exports = PedidoSchema;
