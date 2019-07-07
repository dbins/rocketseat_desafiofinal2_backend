"use strict";
const Antl = use("Antl");
class Tipo {
  get rules() {
    return {
      titulo: "required",
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

module.exports = Tipo;
