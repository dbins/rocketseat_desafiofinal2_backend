"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Tamanho extends Model {
  tipos() {
    return this.belongsTo("App/Models/Tipo");
  }

  file() {
    return this.belongsTo("App/Models/File");
  }
}

module.exports = Tamanho;
