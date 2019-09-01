"use strict";
const User = use("App/Models/User");

class UserController {
  async store({ request, response, auth }) {
    const data = request.only(["username", "email", "password"]);
    data.type = "USUARIO";
    try {
      const user = await User.create(data);
      const token = await auth.attempt(data.email, data.password);
      return response.status(200).json({
        message: "Usuário gravado com sucesso!",
        user: user,
        token: token
      });
    } catch (err) {
      return response
        .status(500)
        .send({ message: "Erro ao tentar inserir um novo usuário" });
    }
  }
}

module.exports = UserController;
