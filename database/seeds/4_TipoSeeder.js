"use strict";
const Tipo = use("App/Models/Tipo");
/*
|--------------------------------------------------------------------------
| TipoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class TipoSeeder {
  async run() {
    await Tipo.createMany([
      {
        titulo: "Portuguesa",
        file_id: 1,
        produto_id: 1
      },
      {
        titulo: "Calabresa",
        file_id: 1,
        produto_id: 1
      },
      {
        titulo: "Frango Frito",
        file_id: 1,
        produto_id: 1
      },
      {
        titulo: "Bacon",
        file_id: 1,
        produto_id: 1
      },
      {
        titulo: "Napolitana",
        file_id: 1,
        produto_id: 1
      },
      {
        titulo: "Coca Cola",
        file_id: 1,
        produto_id: 4
      },
      {
        titulo: "Pepsi",
        file_id: 1,
        produto_id: 4
      }
    ]);
  }
}

module.exports = TipoSeeder;
