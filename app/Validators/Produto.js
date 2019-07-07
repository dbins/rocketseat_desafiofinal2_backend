"use strict";
const Antl = use("Antl");

class Produto {
  get rules() {
    return {
      nome: "required",
      descricao: "required",
      tempo_estimado: "required",
      file_id: "required"
    };
  }
  get validateAll() {
    return true;
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = Produto;
