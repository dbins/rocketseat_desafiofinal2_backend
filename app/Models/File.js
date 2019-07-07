"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Env = use("Env");

class File extends Model {
  produtos() {
    return this.belongsTo("App/Models/Produto");
  }

  tipos() {
    return this.belongsTo("App/Models/Tipo");
  }

  tamanhos() {
    return this.belongsTo("App/Models/Tamanho");
  }

  static get computed() {
    return ["url"];
  }

  getUrl({ id }) {
    return `${Env.get("APP_URL")}/files/${id}`;
  }
}

module.exports = File;
