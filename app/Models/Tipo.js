"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Tipo extends Model {
  produto() {
    return this.belongsTo("App/Models/Produto");
  }

  tamanho() {
    return this.hasMany("App/Models/Tamanho");
  }

  file() {
    return this.belongsTo("App/Models/File");
  }
}

module.exports = Tipo;
