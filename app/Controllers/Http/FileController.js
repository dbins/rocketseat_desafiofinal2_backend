"use strict";

const File = use("App/Models/File");
const Helpers = use("Helpers");
const Drive = use("Drive");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with files
 */
class FileController {
  /**
   * Show a list of all files.
   * GET files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Render a form to be used for creating a new file.
   * GET files/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new file.
   * POST files
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    try {
      if (!request.file("file")) return;

      const upload = request.file("file", { size: "4mb" });

      const fileName = `${Date.now()}.${upload.subtype}`;

      await upload.move(Helpers.tmpPath("uploads"), {
        name: fileName
      });

      if (!upload.moved()) {
        throw upload.error();
      }

      const file = await File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      });

      return response.status(200).send({ file });
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: "Erro no upload da imagem" } });
    }
  }

  /**
   * Display a single file.
   * GET files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    const file = await File.find(params.id);
    if (file) {
      return response.download(Helpers.tmpPath("uploads/" + file.file));
    } else {
      return response
        .status(403)
        .send({ message: "Id da imagem não localizado" });
    }
  }

  /**
   * Render a form to update an existing file.
   * GET files/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update file details.
   * PUT or PATCH files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    if (!request.file("file")) return;

    try {
      const file = await File.find(params.id);
      if (file) {
        const upload = request.file("file", { size: "4mb" });

        const fileName = `${Date.now()}.${upload.subtype}`;

        await upload.move(Helpers.tmpPath("uploads"), {
          name: fileName
        });

        if (!upload.moved()) {
          throw upload.error();
        }

        const data = {
          file: fileName,
          name: upload.clientName,
          type: upload.type,
          subtype: upload.subtype
        };

        file.merge(data);
        await file.save();
        return response.status(200).send({ file });
      } else {
        return response
          .status(403)
          .send({ message: "Id da imagem não localizado" });
      }
    } catch (err) {
      return response
        .status(404)
        .send({ message: "Erro ao atualizar a imagem" });
    }
  }

  /**
   * Delete a file with id.
   * DELETE files/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    try {
      const file = await File.findOrFail(params.id);
      await Drive.delete(file.file);
      await file.delete();

      return response
        .status(200)
        .send({ message: "Imagem excluída com sucesso " });
    } catch (err) {
      return response.status(404).send({ message: "Erro ao excluir a imagem" });
    }
  }
}

module.exports = FileController;
