"use strict";
const Produto = use("App/Models/Produto");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const produtos = await Produto.query()
      .with("file")
      .fetch();
    return produtos;
  }

  /**
   * Render a form to be used for creating a new produto.
   * GET produtos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only([
      "nome",
      "descricao",
      "tempo_estimado",
      "file_id"
    ]);
    const produto = await Produto.create(data);
    return response.status(200).send(produto);
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
	const produto = await Produto.find(params.id);
    if (produto) {
        return response
          .status(200)
          .send(produto);
    } else {
        return response
          .status(404)
          .send({ message: "O ID do produto não foi localizado" });
    }
  }

  /**
   * Render a form to update an existing produto.
   * GET produtos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only([
      "nome",
      "descricao",
      "tempo_estimado",
      "file_id"
    ]);
    const resultado = await Produto.find(params.id);
    if (resultado) {
      resultado.merge(data);
      await resultado.save();
      return response.status(200).send(resultado);
    } else {
      return response
        .status(404)
        .send({ message: "ID do produto não localizado" });
    }
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const produto = await Produto.find(params.id);
      if (produto) {
        await produto.delete();
        return response
          .status(200)
          .send({ message: "Produto excluído com sucesso " });
      } else {
        return response
          .status(404)
          .send({ message: "O ID do produto não foi localizado" });
      }
    } catch (err) {
      return response
        .status(404)
        .send({ message: "Erro ao excluir o produto" });
    }
  }
}

module.exports = ProdutoController;
