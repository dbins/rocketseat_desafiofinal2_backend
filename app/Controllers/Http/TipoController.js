"use strict";
const Tipo = use("App/Models/Tipo");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tipos
 */
class TipoController {
  /**
   * Show a list of all tipos.
   * GET tipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response, view }) {
    const resultado = await Tipo.query()
      .where("produto_id", params.produtos_id)
      .with("file")
      .fetch();

    return resultado;
  }

  /**
   * Render a form to be used for creating a new tipo.
   * GET tipos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new tipo.
   * POST tipos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    const data = request.only(["titulo", "file_id"]);

    const resultado = await Tipo.create({
      ...data,
      produto_id: params.produtos_id
    });
    return resultado;
  }

  /**
   * Display a single tipo.
   * GET tipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const resultado = await Tipo.findOrFail(params.id);
    return resultado;
  }

  /**
   * Render a form to update an existing tipo.
   * GET tipos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update tipo details.
   * PUT or PATCH tipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(["titulo", "file_id"]);
    const resultado = await Tipo.find(params.id);
    if (resultado) {
      data.produto_id = params.produtos_id;
      resultado.merge(data);
      await resultado.save();
      return response.status(200).send(resultado);
    } else {
      return response
        .status(404)
        .send({ message: "ID do tipo não localizado" });
    }
  }

  /**
   * Delete a tipo with id.
   * DELETE tipos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const tipo = await Tipo.find(params.id);
      if (tipo) {
        await tipo.delete();
        return response
          .status(200)
          .send({ message: "Tipo de Produto excluído com sucesso " });
      } else {
        return response
          .status(404)
          .send({ message: "O ID do tipo de produto não foi localizado" });
      }
    } catch (err) {
      return response
        .status(404)
        .send({ message: "Erro ao excluir o tipo de produto" });
    }
  }
}

module.exports = TipoController;
