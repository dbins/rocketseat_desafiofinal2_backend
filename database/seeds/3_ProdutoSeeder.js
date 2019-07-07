"use strict";
const Produto = use("App/Models/Produto");

/*
|--------------------------------------------------------------------------
| ProdutoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class ProdutoSeeder {
  async run() {
    const produtos = await Produto.createMany([
      {
        nome: "Pizzas",
        descricao:
          "Mais de 50 sabores de pizzas em até 4 tamanhos diferentes de fome",
        tempo_estimado: 30,
        file_id: 1
      },
      {
        nome: "Massas",
        descricao:
          "10 tipos de massas com diferentes molhos para te satisfazer",
        tempo_estimado: 15,
        file_id: 2
      },
      {
        nome: "Calzones",
        descricao: "Calzones super recheados com mais de 50 sabores diferentes",
        tempo_estimado: 25,
        file_id: 3
      },
      {
        nome: "Bebidas não-alcóolicas",
        descricao: "Refrigerantes, sucos, chá gelado, energéticos e água",
        tempo_estimado: 15,
        file_id: 4
      },
      {
        nome: "Bebibas Alcóolicas",
        descricao: "Cervejas artesanais, vinhos e destilados",
        tempo_estimado: 25,
        file_id: 5
      }
    ]);
  }
}

module.exports = ProdutoSeeder;
