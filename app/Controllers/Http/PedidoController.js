"use strict";
const Database = use("Database");
const Pedido = use("App/Models/Pedido");
const Item = use("App/Models/PedidoItens");
const moment = use("moment");
const Kue = use("Kue");
const Job = use("App/Jobs/PizzariaEmail");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with pedidos
 */
class PedidoController {
  /**
   * Show a list of all pedidos.
   * GET pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
	const { status } = request.get(); // parametro para filtro pelo titulo do meetup
    const whereLikeStatus = status && status !== "" ? `pedidos.status = '${status}' ` : "";
	
    const pedidos = await Pedido.query()
      .with("user")
      .with("produtos")
	  .whereRaw(whereLikeStatus)
	  .orderBy('id', 'desc')
      .fetch();
    return pedidos;
  }

  /**
   * Render a form to be used for creating a new pedido.
   * GET pedidos/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new pedido.
   * POST pedidos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data_request = request.all();
    const user = auth.user;
    const data = {
      observacao: data_request.observacao,
      rua: data_request.rua,
      numero: data_request.numero,
      bairro: data_request.bairro,
      estado: data_request.uf,
      cep: data_request.cep,
      valor: data_request.valor,
      user_id: auth.user.id,
	  status: 'PENDENTE'
    };
    const produtos = request.input("produtos");

    const trx = await Database.beginTransaction();

    const order = await Pedido.create(data, trx);

    await order.produtos().createMany(produtos, trx);

    await trx.commit();

    //Opcional. Desativar caso nao seja necessario envio de e-mail ao finalizar pedido
    const dateFormat = moment().format("DD/MM/YYYY");
    const hourFormat = moment().format("HH:mm");
    const job = Kue.dispatch(
      Job.key,
      { user, dateFormat, hourFormat },
      { attempts: 3 }
    );

    //Apenas para testes da fila!
    //job.on("failed attempts", (messageError, doneAttempts) => {
    //  console.log(messageError);
    //  console.log(doneAttempts);
    //});
    //job.on("failed", messageError => {
    //  console.log(messageError);
    //});
    //job.on("complete", result => {
    //  console.log(result);
    //});

    return order;
  }

  /**
   * Display a single pedido.
   * GET pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view, auth }) {
    const pedidos = await Pedido.query()
      .where("id", params.id)
      .with("user")
      .with("produtos")
      .fetch();
    return pedidos;
  }

  /**
   * Render a form to update an existing pedido.
   * GET pedidos/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update pedido details.
   * PUT or PATCH pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data_request = request.all();
    const data = {
      observacao: data_request.observacao,
      rua: data_request.rua,
      numero: data_request.numero,
      bairro: data_request.bairro,
      estado: data_request.uf,
      cep: data_request.cep,
      valor: data_request.valor,
	  status: data_request.status,
    };
    const resultado = await Pedido.find(params.id);
    if (resultado) {
      resultado.merge(data);
      await resultado.save();
      const pedidos = await Pedido.query()
        .where("id", params.id)
        .with("user")
        .with("produtos")
        .fetch();
      return response.status(200).send(pedidos);
    } else {
      return response
        .status(404)
        .send({ message: "ID do tamanho não localizado" });
    }
  }

  /**
   * Delete a pedido with id.
   * DELETE pedidos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const pedido = await Pedido.find(params.id);
      if (pedido) {
        const itens = Item.query().where("pedido_id", params.id);
        if (itens) {
          await itens.delete();
        }
        await pedido.delete();
        return response
          .status(200)
          .send({ message: "Pedido excluído com sucesso " });
      } else {
        return response
          .status(404)
          .send({ message: "O ID do pedido não foi localizado" });
      }
    } catch (err) {
      return response.status(404).send({ message: "Erro ao excluir o pedido" });
    }
  }

  async pedidosUsuario({ request, auth }) {
	const resultados = await Pedido.query()
      .where("user_id", auth.user.id)
      .with("user")
      .with("produtos")
	  .orderBy('id', 'desc')
      .fetch();
    return resultados;
  }
}

module.exports = PedidoController;
