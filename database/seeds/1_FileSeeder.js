"use strict";
const File = use("App/Models/File");
/*
|--------------------------------------------------------------------------
| FileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class FileSeeder {
  async run() {
    await File.createMany([
      {
        file: "pizzas/pizzas.jpg",
        name: "pizzas",
        type: "jpg"
      },
      {
        file: "massas/massas.jpg",
        name: "massas",
        type: "jpg"
      },
      {
        file: "tamanhos/tamanho-gg.png",
        name: "Pizza gigante",
        type: "png"
      },
      {
        file: "tamanhos/tamanho-g.png",
        name: "Pizza grande",
        type: "png"
      },
      {
        file: "tamanhos/tamanho-m.png",
        name: "Pizza média",
        type: "png"
      },
      {
        file: "tamanhos/tamanho-p.png",
        name: "Pizza pequena",
        type: "png"
      },
      {
        file: "pizzas/bacon.png",
        name: "Pizza Bacon",
        type: "png"
      },
      {
        file: "pizzas/frango_frito.png",
        name: "Pizza frango_frito",
        type: "png"
      },
      {
        file: "pizzas/margherita.png",
        name: "Pizza margherita",
        type: "png"
      },
      {
        file: "pizzas/mussarela.png",
        name: "Pizza mussarela",
        type: "png"
      },
      {
        file: "pizzas/napolitana.png",
        name: "Pizza napolitana",
        type: "png"
      },
      {
        file: "pizzas/portuguesa.png",
        name: "Pizza portuguesa",
        type: "png"
      }
    ]);
  }
}

module.exports = FileSeeder;
