"use strict";
const File = use("App/Models/File");
const Helpers = use("Helpers");
const Drive = use("Drive");
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
	
	//Upload de arquivos
	var fileName = "";
	var upload;
	upload =  Drive.get("../../resources/imagens/pizzas/pizzas.jpg");
	fileName = "pizzas.jpg";
	await upload.move(Helpers.tmpPath("uploads"), {name: fileName});

	
    upload =  Drive.get("../../resources/imagens/massas/massas.jpg");
    fileName = "massas.jpg";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});
	
    upload =  Drive.get("../../resources/imagens/tamanhos/tamanho-gg.png");
    fileName = "Pizza gigante.png";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});
	
    upload =  Drive.get("../../resources/imagens/tamanhos/tamanho-g.png");
    fileName = "Pizza grande.png";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});
    
    upload =  Drive.get("../../resources/imagens/tamanhos/tamanho-m.png");
    fileName = "Pizza média.png";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});

    upload =  Drive.get("../../resources/imagens/tamanhos/tamanho-p.png");
    fileName = "Pizza pequena.png";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});
	
    upload =  Drive.get("../../resources/imagens/pizzas/bacon.png");
    fileName = "Pizza Bacon.png";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});
	
    upload =  Drive.get("../../resources/imagens/pizzas/frango_frito.png");
    fileName = "Pizza frango_frito.png";
	await upload.move(Helpers.tmpPath("uploads"), {name: fileName});    
	
	upload =  Drive.get("../../resources/imagens/pizzas/margherita.png");
    fileName = "Pizza margherita.png";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});
	
    upload =  Drive.get("../../resources/imagens/pizzas/mussarela.png");
    fileName = "Pizza mussarela.png";
	await upload.move(Helpers.tmpPath("uploads"), {name: fileName});

	upload =  Drive.get("../../resources/imagens/pizzas/napolitana.png");
    fileName = "Pizza napolitana.png";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});
    
    upload =  Drive.get("../../resources/imagens/pizzas/portuguesa.png");
    fileName = "Pizza portuguesa.png";
    await upload.move(Helpers.tmpPath("uploads"), {name: fileName});
	
  }
}

module.exports = FileSeeder;
