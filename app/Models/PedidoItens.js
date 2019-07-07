"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PedidoItens extends Model {
  pedido() {
    return this.belongsTo("App/Models/Pedido");
  }
  tamanho() {
    return this.belongsTo("App/Models/Tamanho");
  }
  tipo() {
    return this.belongsTo("App/Models/Tipo");
  }
  produto() {
    return this.belongsTo("App/Models/Produto");
  }
}

module.exports = PedidoItens;
