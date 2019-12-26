"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.post("users", "UserController.store").validator("User");
Route.post("sessions", "SessionController.store").validator("Login");
Route.post("sessions_social", "SessionController.store_social");
Route.get("files/:id", "FileController.show");

Route.group(() => {
  Route.post("files", "FileController.store");
  Route.put("/files/:id", "FileController.update");
  Route.delete("/files/:id", "FileController.destroy");

  Route.post("produtos", "ProdutoController.store").validator("Produto");
  Route.put("produtos/:id", "ProdutoController.update").validator("Produto");
  Route.get("produtos/:id", "ProdutoController.show");
  Route.delete("produtos/:id", "ProdutoController.destroy");
  Route.get("produtos", "ProdutoController.index");

  Route.get("pedidos", "PedidoController.index");
  Route.get("pedidos/:id", "PedidoController.show");
  Route.delete("pedidos/:id", "PedidoController.destroy");
  Route.put("pedidos/:id", "PedidoController.update");
  Route.get("pedidos/app/user", "PedidoController.pedidosUsuario");
  Route.post("pedidos", "PedidoController.store");
  Route.post("busca", "TipoController.search");
  Route.get("pedidos/admin/dashboard", "PedidoController.dashboard");

  Route.resource("produtos.tipos", "TipoController").validator("Tipo");
  Route.resource("produtos.tipos.tamanhos", "TamanhoController");
}).middleware(["auth"]);
