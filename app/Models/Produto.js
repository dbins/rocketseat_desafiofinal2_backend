"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Produto extends Model {
  file() {
    return this.belongsTo("App/Models/File");
  }
  tipos() {
    return this.hasMany("App/Models/Tipo");
  }
}

module.exports = Produto;
