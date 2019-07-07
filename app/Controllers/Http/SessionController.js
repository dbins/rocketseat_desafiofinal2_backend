"use strict";
const User = use("App/Models/User");
const Hash = use("Hash");

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
    const { email, password, origin } = request.all();
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
	  console.log(origin);
	  console.log(user.type);
      if (
        (origin === "MOBILE" && user.type === "ADMIN") ||
        (origin === "WEB" && user.type === "USUARIO")
      ) {
        return response
          .status(403)
          .send({ error: { message: "Usuário não autorizado" } });
      }
      const token = await auth.attempt(email, password);
	  return response.status(200).send({token, user});
    } catch (err) {
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
