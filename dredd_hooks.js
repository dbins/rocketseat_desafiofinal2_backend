const hooks = require("hooks");
const faker = require("faker");
const fs = require("fs");
const Multipart = require("multi-part");
const streamToString = require("stream-to-string");
const mysql = require("mysql");
const FormData = require('form-data');
var jwt = {
  token: null
};

var codigo_produto = 0;
var codigo_tipo_produto = 0;
var codigo_tamanho_produto = 0;
var codigo_pedido = 0;
var codigo_imagem = 0;

var cadastro = {
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

var cadastro_social = {
  username: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  origin: "MOBILE",
  sistema: "ANDROID",
  versao: "4",
  api: "16",
  marca: "SAMSUNG",
  social_origem: "FACEBOOK",
  social_id: faker.random.alphaNumeric(10)
};

var produto = {
  nome: faker.commerce.productName(),
  descricao: "Cervejas artesanais, vinhos e destilados.",
  tempo_estimado: 5,
  file_id: 5
};

var produto_atualizado = {
  nome: faker.commerce.productName(),
  descricao: "Cervejas artesanais, vinhos e destilados.",
  tempo_estimado: 5,
  file_id: 5
};

var tipo_produto = {
  titulo: faker.commerce.productName(),
  file_id: 5
};

var tipo_produto_atualizado = {
  titulo: faker.commerce.productName(),
  file_id: 5
};

var tamanho_produto = {
  titulo: faker.commerce.productName(),
  valor: "29",
  file_id: 2
};

var pedido = {
  observacao: "Teste pedido",
  rua: "RUA CASTRO ALVES",
  numero: "1",
  bairro: "ACLIMACAO",
  estado: "SP",
  cep: "01532001",
  valor: 29,
  status: "PENDENTE",
  user_id: 1,
  produtos: [
    {
      produto_tamanho_id: "3",
      titulo: "TESTE",
      tamanho: "PEQUENO",
      valor: "10",
      imagem: "http://0.0.0.0:3333/files/17",
      produto_id: 2,
      produto_tipo_id: 6
    },
    {
      produto_tamanho_id: "2",
      titulo: "TESTE",
      tamanho: "PEQUENO",
      valor: "10",
      imagem: "http://0.0.0.0:3333/files/19",
      produto_id: 2,
      produto_tipo_id: 6
    }
  ]
};

var pedido_atualizado = {
  status: "PAGO"
};

hooks.before("Usuário > Criar Usuário > Criar Usuário", function(transaction) {
  transaction.request.body = JSON.stringify(cadastro);
});

hooks.before(
  "Usuário > Login do usuário > Login do usuário por rede social. Se o usuário não existir, ele será criado",
  function(transaction) {
    transaction.request.body = JSON.stringify(cadastro_social);
  }
);

hooks.before("Produtos > Produtos > Cadastrar Categoria", function(
  transaction
) {
  transaction.request.body = JSON.stringify(produto);
});

hooks.after("Produtos > Produtos > Cadastrar Categoria", function(transaction) {
  codigo_produto = JSON.parse(transaction.real.body).id;
});

hooks.before("Produtos > Produtos > Ver Categoria", function(transaction) {
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_produto);
});

hooks.before("Produtos > Produtos > Atualizar Categorias", function(
  transaction
) {
  transaction.request.body = JSON.stringify(produto_atualizado);
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_produto);
});

hooks.before("Produtos > Produtos > Excluir Categorias", function(transaction) {
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_produto);
});

hooks.before("Tipos > Tipos > Cadastrar tipo de produto", function(
  transaction
) {
  let codigo_produto = 2;
  transaction.request.body = JSON.stringify(tipo_produto);
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_produto);
});

hooks.after("Tipos > Tipos > Cadastrar tipo de produto", function(transaction) {
  codigo_tipo_produto = JSON.parse(transaction.real.body).id;
});

hooks.before("Tipos > Tipos > Ver tipo de produto", function(transaction) {
  //transaction.skip = true; //Para pular o teste!
  let codigo_produto = 4;
  let url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "produtos/1",
    "produtos/" + codigo_produto
  );
  let codigo_tipo_produto = 6;
  url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_tipo_produto);
});

hooks.before("Tipos > Tipos > Atualizar tipo de produto", function(
  transaction
) {
  let codigo_produto = 2;
  transaction.request.body = JSON.stringify(tipo_produto_atualizado);
  let url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "produtos/1",
    "produtos/" + codigo_produto
  );
  url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_tipo_produto);
});

hooks.before("Tipos > Tipos > Apagar tipo de produto", function(transaction) {
  let codigo_produto = 2;
  let url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "produtos/1",
    "produtos/" + codigo_produto
  );
  url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_tipo_produto);
});

hooks.before(
  "Tamanhos > Tamanhos de produtos > Tamanhos de produtos por tipo",
  function(transaction) {
    let codigo_produto = 4;
    let codigo_tipo_produto = 6;
    let url = transaction.fullPath;
    transaction.fullPath = url.replace(
      "produtos/1",
      "produtos/" + codigo_produto
    );
    url = transaction.fullPath;
    transaction.fullPath = url.replace("1", codigo_tipo_produto);
    transaction.request.body = JSON.stringify(tamanho_produto);
  }
);

hooks.before(
  "Tamanhos > Tamanhos de produtos > Cadastrar tamanho de produto",
  function(transaction) {
    //transaction.skip = true;
    let codigo_produto = 2;
    let codigo_tipo_produto = 11;
    let url = transaction.fullPath;
    transaction.fullPath = url.replace(
      "produtos/1",
      "produtos/" + codigo_produto
    );
    url = transaction.fullPath;
    transaction.fullPath = url.replace("1", codigo_tipo_produto);
    transaction.request.body = JSON.stringify(tamanho_produto);
  }
);

hooks.after(
  "Tamanhos > Tamanhos de produtos > Cadastrar tamanho de produto",
  function(transaction) {
    //transaction.skip = true;
    console.log("cadastrar tamanho");
    if (transaction.real) {
      console.log("cadastrar tamanho 1");
      if (JSON.parse(transaction.real.body).id) {
        console.log("cadastrar tamanho 2");
        codigo_tamanho_produto = JSON.parse(transaction.real.body).id;
      }
    }
  }
);

hooks.before("Tamanhos > Tamanhos > Ver tamanho de produto", function(
  transaction
) {
  //transaction.skip = true;
  let codigo_produto = 2;
  let codigo_tipo_produto = 11;
  let url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "produtos/1",
    "produtos/" + codigo_produto
  );
  url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "/tipos/1",
    "/tipos/" + codigo_tipo_produto
  );
  url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "/tamanhos/1",
    "/tamanhos/" + codigo_tamanho_produto
  );
  console.log("estou aqui nesta rota chata!");
  console.log(transaction.fullPath);
});

hooks.before("Tamanhos > Tamanhos > Atualizar tamanho de produto", function(
  transaction
) {
  //transaction.skip = true;
  let codigo_produto = 2;
  let codigo_tipo_produto = 11;
  let url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "produtos/1",
    "produtos/" + codigo_produto
  );
  url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "/tipos/1",
    "/tipos/" + codigo_tipo_produto
  );
  url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "/tamanhos/1",
    "/tamanhos/" + codigo_tamanho_produto
  );
  transaction.request.body = JSON.stringify(tamanho_produto);
});

hooks.before("Tamanhos > Tamanhos > Apagar tamanho de produto", function(
  transaction
) {
  //transaction.skip = true;
  let codigo_produto = 2;
  let codigo_tipo_produto = 11;
  let url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "produtos/1",
    "produtos/" + codigo_produto
  );
  url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "/tipos/1",
    "/tipos/" + codigo_tipo_produto
  );
  url = transaction.fullPath;
  transaction.fullPath = url.replace(
    "/tamanhos/1",
    "/tamanhos/" + codigo_tamanho_produto
  );
});

hooks.before("Pedidos > Pedidos > Gravar Pedido", function(transaction) {
  transaction.request.body = JSON.stringify(pedido);
});

hooks.after("Pedidos > Pedidos > Gravar Pedido", function(transaction) {
  codigo_pedido = JSON.parse(transaction.real.body).id;
});

hooks.before("Pedidos > Pedido > Ver Pedido", function(transaction) {
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_pedido);
  console.log(transaction.fullPath);
});

hooks.before(
  "Pedidos > Pedido > Atualizar Endereço, Status e Observação",
  function(transaction) {
    transaction.request.body = JSON.stringify(pedido_atualizado);
    let url = transaction.fullPath;
    transaction.fullPath = url.replace("1", codigo_pedido);
  }
);

hooks.before("Pedidos > Pedido > Excluir Pedido", function(transaction) {
  let url = transaction.fullPath;
  transaction.fullPath = url.replace("1", codigo_pedido);
});

hooks.before(
  "Files > Imagens dos Produtos, Tipos e Tamanhos > Imagem do produto",
  function(transaction) {
    //transaction.skip = true;
    var codigo_imagem = 25;
    console.log("vou trocar o link da imagem");
    let url = transaction.fullPath;
    console.log(url);
    transaction.fullPath = url.replace("1", codigo_imagem);
    console.log(transaction.fullPath);
  }
);

hooks.before(
  "Files > Imagens dos Produtos, Tipos e Tamanhos > Atualizar Imagem do produto",
  function(transaction) {
    transaction.skip = true;
  }
);

hooks.before(
  "Files > Imagens dos Produtos, Tipos e Tamanhos > Apagar Imagem do Produto",
  function(transaction) {
    //transaction.skip = true;
    let url = transaction.fullPath;
    console.log(url);
    transaction.fullPath = url.replace("1", codigo_imagem);
    console.log(transaction.fullPath);
  }
);

hooks.before(
  "Files > Enviar Imagem do Produto > Enviar Imagem do Produto",
  async function(transaction) {
    
	transaction.skip = true; //Para pular o teste!
    
	//Exemplo da documentacao - Nao funcionou...
	//const form = new Multipart();
    //form.append(
    //  "file",
    //  fs.createReadStream("./resources/imagens/pizzas/1.png")
    //);
    //const conteudo = await streamToString(form.getStream());
    //const tamanho = conteudo.length;
    //transaction.request.body = conteudo;
    //transaction.request.headers["Content-Type"] = form.getHeaders()["content-type"];
    //transaction.request.headers["Content-Length"] = tamanho;
	
	//Nao funcionou...
	var form = new FormData();
	form.append('file', fs.createReadStream("./resources/imagens/pizzas/1.png"));
	let data     = '';
	let boundary = form.getBoundary();
	for( let i = 0, len = form._streams.length; i < len; i++ ) {

		if( typeof form._streams[i] !== 'function' ) {
			data += form._streams[i];

			if( typeof form._streams[i] !== 'string' || form._streams[i].substring( 0, boundary.length ) === boundary ) {
				data += '\r\n';
			}
		}
	}

	transaction.request.body = data;
  }
);

hooks.after("Usuário > Login > Login do usuário", function(transaction) {
  jwt.token = JSON.parse(transaction.real.body).token.token;
});

hooks.beforeEach(function(transaction) {
  if (transaction.fullPath == "/produtos/1/tipos/1/") {
    console.log("nome da rota");
    console.log(transaction.name);
  }
});

hooks.afterEach(function(transaction) {
  console.log(transaction.name);
  //if (transaction.name == "Usuário > Login > Login do usuário"){
  //	console.log("estou aqui no dreddddd");
  // 	console.log(transaction.real.body);
  //}
});

hooks.beforeEach(function(transaction) {
  if (jwt.token != null) {
    transaction.request.headers["Authorization"] = `Bearer ${jwt.token}`;
  }
  //Apenas para fins de testes, criar uma imagem no banco para testar a rotina de apagar
  if (codigo_imagem === 0) {
    const connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "pizzaria"
    });
    connection.connect();
    const StrSQL =
      "INSERT INTO files (file, name, type, subtype) VALUES ('teste/teste.jpg', 'imagem de testes', 'image', 'jpeg')";

    var query = connection.query(StrSQL, function(err, result) {
      codigo_imagem = result.insertId;
    });

    connection.end();
  }
});
