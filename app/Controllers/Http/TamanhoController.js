"use strict";
const Tamanho = use("App/Models/Tamanho");
const moment = use("moment");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tamanhos
 */
class TamanhoController {
  /**
   * Show a list of all tamanhos.
   * GET tamanhos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response, view, auth }) {
    if (auth.user.type == "USUARIO") {
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      const log_produto = {
        user_id: auth.user.id,
        produto_id: params.produtos_id,
        produto_tipo_id: params.tipos_id,
        produto_tamanho_id: 0,
        created_at: now,
        updated_at: now
      };
      const gravar_log = await use("Database")
        .table("log_produtos")
        .insert(log_produto);
    }
    const resultado = await Tamanho.query()
      .where("produto_tipo_id", params.tipos_id)
      .with("file")
      .with("tipos")
      .with("tipos.file")
      .fetch();

    return resultado;
  }

  /**
   * Render a form to be used for creating a new tamanho.
   * GET tamanhos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new tamanho.
   * POST tamanhos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    const data = request.only(["titulo", "valor", "file_id"]);

    const resultado = await Tamanho.create({
      ...data,
      produto_tipo_id: parseInt(params.tipos_id)
    });
    resultado.valor = parseFloat(resultado.valor);
    return response.status(200).send(resultado);
  }

  /**
   * Display a single tamanho.
   * GET tamanhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const resultado = await Tamanho.find(params.id);
    if (resultado) {
      return response.status(200).send(resultado);
    } else {
      return response
        .status(404)
        .send({ message: "O ID do tamanho não foi localizado" });
    }
  }

  /**
   * Render a form to update an existing tamanho.
   * GET tamanhos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update tamanho details.
   * PUT or PATCH tamanhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(["titulo", "valor", "file_id", "id"]);
    const resultado = await Tamanho.find(params.id);
    if (resultado) {
      data.produto_tipo_id = parseInt(params.tipos_id);
      data.valor = parseFloat(data.valor);
      resultado.merge(data);
      await resultado.save();
      return response.status(200).send(resultado);
    } else {
      return response
        .status(404)
        .send({ message: "ID do tamanho não localizado" });
    }
  }

  /**
   * Delete a tamanho with id.
   * DELETE tamanhos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const tamanho = await Tamanho.find(params.id);
      if (tamanho) {
        await tamanho.delete();
        return response
          .status(200)
          .send({ message: "Tamanho de Produto excluído com sucesso" });
      } else {
        return response
          .status(404)
          .send({ message: "O ID do tamamho produto não foi localizado" });
      }
    } catch (err) {
      return response
        .status(404)
        .send({ message: "Erro ao excluir o tamanho de produto" });
    }
  }
}

module.exports = TamanhoController;
