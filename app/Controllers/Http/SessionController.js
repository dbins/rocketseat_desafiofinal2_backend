"use strict";
const User = use("App/Models/User");
const Hash = use("Hash");
const moment = use("moment");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with sessions
 */
class SessionController {
  /**
   * Show a list of all sessions.
   * GET sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new session.
   * GET sessions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new session.
   * POST sessions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const {
      email,
      password,
      origin,
      sistema,
      versao,
      api,
      marca
    } = request.all();
    try {
      const user = await User.findBy("email", email);
      if (!user) {
        return response
          .status(404)
          .json({ message: "O e-mail informado não foi localizado" });
      }

      const isSame = await Hash.verify(password, user.password);

      if (!isSame) {
        return response
          .status(401)
          .json({ message: "A senha ou o email informados estão incorretos" });
      }

      if (
        (origin === "MOBILE" && user.type === "ADMIN") ||
        (origin === "WEB" && user.type === "USUARIO")
      ) {
        return response
          .status(403)
          .send({ error: { message: "Usuário não autorizado" } });
      }
      const token = await auth.attempt(email, password);
      if (origin === "MOBILE") {
        const now = moment().format("YYYY-MM-DD HH:mm:ss");
        const dados_log = {
          user_id: user.id,
          sistema,
          versao,
          api,
          marca,
          created_at: now,
          updated_at: now
        };
        await use("Database")
          .table("logins")
          .insert(dados_log);
      }
      return response.status(200).send({ token, user });
    } catch (err) {
      return response.status(500).send({
        message:
          "Erro ao tentar logar o usuário. Verifique o login e a senha informados"
      });
    }
  }

  async store_social({ request, response, auth }) {
    const {
      username,
      email,
      origin,
      sistema,
      versao,
      api,
      marca,
      social_origem,
      social_id
    } = request.all();
    let id_facebook = "";
    let id_google = "";
    let user = {};
    const password = social_id;
    try {
      user = await User.findBy("email", email);
      if (user) {
        //O e-mail é unico, atualizar dados do usuário atual..
        const dados = {};
        if (social_origem == "GOOGLE") {
          dados.id_google = social_id;
        }
        if (social_origem == "FACEBOOK") {
          dados.id_facebook = social_id;
        }
        user.merge(dados);
        await user.save();
      }
      if (social_origem == "GOOGLE") {
        user = await User.findBy("id_google", social_id);
        id_google = social_id;
      }
      if (social_origem == "FACEBOOK") {
        user = await User.findBy("id_facebook", social_id);
        id_facebook = social_id;
      }
      if (!user) {
        const dados = {
          username,
          email,
          password,
          id_facebook,
          id_google
        };
        console.log(dados);
        user = await User.create(dados);

        if (social_origem == "GOOGLE") {
          user = await User.findBy("id_google", social_id);
          console.log("-1-");
        }
        if (social_origem == "FACEBOOK") {
          user = await User.findBy("id_facebook", social_id);
          console.log("-2-");
        }
      }
      if (user.id) {
        console.log(user);
        console.log("-3-");
        const token = await auth.attempt(email, password);
        if (origin === "MOBILE") {
          const dados_log = { user_id: user.id, sistema, versao, api, marca };
          await use("Database")
            .table("logins")
            .insert(dados_log);
        }
        return response.status(200).send({ token, user });
      } else {
        return response.status(500).send({
          message: "Houve um problema ao logar o usuário"
        });
      }
    } catch (err) {
      console.log(err);
      return response.status(500).send({
        message:
          "Erro ao tentar logar o usuário. Verifique o login e a senha informados"
      });
    }
  }

  /**
   * Display a single session.
   * GET sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing session.
   * GET sessions/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update session details.
   * PUT or PATCH sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a session with id.
   * DELETE sessions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = SessionController;
