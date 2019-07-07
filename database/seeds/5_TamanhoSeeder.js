"use strict";
const Tamanho = use("App/Models/Tamanho");
/*
|--------------------------------------------------------------------------
| TamanhoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class TamanhoSeeder {
  async run() {
    await Tamanho.createMany([
      {
        titulo: "Grande",
        valor: 40,
        file_id: 1,
        produto_tipo_id: 1
      },
      {
        titulo: "Média",
        valor: 20,
        file_id: 1,
        produto_tipo_id: 1
      },
      {
        titulo: "Pequena",
        valor: 10,
        file_id: 1,
        produto_tipo_id: 1
      },
      {
        titulo: "Grande",
        valor: 40,
        file_id: 1,
        produto_tipo_id: 1
      },
      {
        titulo: "Média",
        valor: 20,
        file_id: 1,
        produto_tipo_id: 1
      },
      {
        titulo: "600 ml",
        valor: 5,
        file_id: 1,
        produto_tipo_id: 6
      },
      {
        titulo: "2 litros",
        valor: 10,
        file_id: 1,
        produto_tipo_id: 6
      }
    ]);
  }
}

module.exports = TamanhoSeeder;
