"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Pedido extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  produtos() {
    return this.hasMany("App/Models/PedidoItens");
  }
}

module.exports = Pedido;
