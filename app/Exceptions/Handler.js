"use strict";
const Env = use("Env");
const Youch = use("youch");
const BaseExceptionHandler = use("BaseExceptionHandler");

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle(error, { request, response }) {
    if (error.name === "HttpException") {
      return response
        .status(error.status)
        .send({ error: { message: "Rota inválida" } });
    }
    if (error.name === "InvalidJwtToken") {
      return response.status(error.status).send({
        error: {
          message: "É necessário um token de usuário para acessar este recurso"
        }
      });
    }
    if (error.name === "ValidationException") {
      return response.status(error.status).send(error.messages);
    }

    if (Env.get("NODE_ENV") === "development") {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();
      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report(error, { request }) {
    console.log(error);
  }
}

module.exports = ExceptionHandler;
