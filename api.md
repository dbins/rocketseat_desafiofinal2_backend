FORMAT: 1A
HOST: http://127.0.0.1:3000

# API PIZZARIA

API do aplicativo Pizzaria Don Juan!

## Sobre [/]

API do desafio final da RocketSeat feita com AdonisJS + banco de dados MySQL!

# Group Usuário

## Criar Usuário  [/users]

### Criar Usuário [POST]

- Request (application/json)

	- Body

			{
				"username": "Bins2",
				"email": "bins22@ig.com.br",
				"password": "1234576"
			}

- Response 200 (application/json; charset=utf-8)

	- Attributes (CreateUserResponse)
	
	- Body

			{

				"message": "Usuário gravado com sucesso!",
				"user": {
				"username": "Biin1s231",
				"email": "biins111223@ig.com.br",
				"password": "$2a$10\$Fw1Nk5YFS3v7XU2DqK3rWuOhxbAStOJz30MaNS8/cukcUpuoYydsK",
				"created_at": "2019-05-05 16:29:57",
				"updated_at": "2019-05-05 16:29:57",
				"id": 52
				},
				"token": {
					"type": "bearer",
					"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUyLCJpYXQiOjE1NTcwODQ1OTd9.d0LDChT503W263fazumB2Hp31xb1DCxu4WEkuMozjgg",
					"refreshToken": null
				}
			}

## Login [/sessions]

### Login do usuário [POST]

- Request (application/json)

	- Body

			{
				"email": "bins22@ig.com.br",
				"password": "1234576",
				"origin": "MOBILE",
				"sistema": "ANDROID",
				"versao": "4",
				"api": "16",
				"marca": "SAMSUNG"

			}

- Response 200 (application/json; charset=utf-8)

	- Attributes (LoginResponse)

	- Body

			{
				"user": {
					"id": 67,
					"username": "Bins",
					"email": "bins22@ig.com.br",
					"password": "$2a$10$Qk5RWCW9hFcssle8.Ro4PunagPKoKkaeAMw7.N45E7ViUHBw8Wxii",
					"type": "USUARIO",
					"created_at": "2019-05-21 23:11:34",
					"updated_at": "2019-05-21 23:12:57",
					"id_google": "",
					"id_facebook": "12345678910"
				}
				{
                "token": {
                   "type": "bearer",
                   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1NjM3MTczNzN9.otd3_U-PxnME3M7rh0FnKXYBi0dhDOaShaPDN9Qk49w",
                   "refreshToken": null
				}
			}
			
- Response 404 (application/json; charset=utf-8)

	- Body		

			{
				"message": "O e-mail informado não foi localizado"
			}		

- Response 401 (application/json; charset=utf-8)

	- Body		

			{
				"message": "A senha ou o email informados estão incorretos"
			}			

- Response 403 (application/json; charset=utf-8)

	- Body		

			{
				"message": "Erro ao tentar logar o usuário. Verifique o login e a senha informados"
			}			

## Login do usuário [/sessions_social]

### Login do usuário por rede social. Se o usuário não existir, ele será criado [POST]

- Request (application/json)

	- Body

			{
				"username": "Bins",
				"email": "bins22@ig.com.br",
				"password": "1234576",
				"origin": "MOBILE",
				"sistema": "ANDROID",
				"versao": "4",
				"api": "16",
				"marca": "SAMSUNG",
				"social_origem": "FACEBOOK",
				"social_id": "12345678910"
			}

- Response 200 (application/json; charset=utf-8)

	- Attributes (LoginResponse)

	- Body

			{
				"user": {
					"id": 67,
					"username": "Bins",
					"email": "bins22@ig.com.br",
					"password": "$2a$10$Qk5RWCW9hFcssle8.Ro4PunagPKoKkaeAMw7.N45E7ViUHBw8Wxii",
					"type": "USUARIO",
					"created_at": "2019-05-21 23:11:34",
					"updated_at": "2019-05-21 23:12:57",
					"id_google": "",
					"id_facebook": "12345678910"
				}
				{
                "token": {
                   "type": "bearer",
                   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1NjM3MTczNzN9.otd3_U-PxnME3M7rh0FnKXYBi0dhDOaShaPDN9Qk49w",
                   "refreshToken": null
				}
			}
			
- Response 404 (application/json; charset=utf-8)

	- Body		

			{
				"message": "O e-mail informado não foi localizado"
			}		

- Response 401 (application/json; charset=utf-8)

	- Body		

			{
				"message": "A senha ou o email informados estão incorretos"
			}			

- Response 403 (application/json; charset=utf-8)

	- Body		

			{
				"message": "Erro ao tentar logar o usuário. Verifique o login e a senha informados"
			}	
			
# Group Files
Imagens dos produtos da Pizzaria			
			
## Imagens dos Produtos, Tipos e Tamanhos	 [/files/{id}]

### Imagem do produto [GET]

- Parameters

	- id: 1 (number) - ID do arquivo

- Request (application/json)   	

- Response 200 (image/jpeg)  

### Atualizar Imagem do produto [PUT]
O envio do arquivo deve ser feito atráves de form-data (multipart/form-data). O nome da variável deve ser file

- Parameters

	- id: 1 (number) - ID do arquivo

- Request (multipart/form-data; boundary=---BOUNDARY)

        -----BOUNDARY
        Content-Disposition: form-data; name="file[file]"; filename="image.jpg"
        Content-Type: image/jpeg
        Content-Transfer-Encoding: base64

        /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a
        HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy
        MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIA
        AhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEB
        AAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AD//Z
        -----BOUNDARY

	
	- Headers

			Authentication: Bearer JWT	
			
- Response 200 (application/json; charset=utf-8)		

	- Attributes(FileResponse)

	- Body
	
			{
				"file": {
					"file": "1558396610564.jpeg",
					"name": "0_11b748_d4d498a0_XXL.jpg",
					"type": "image",
					"subtype": "jpeg",
					"created_at": "2019-05-20 20:56:50",
					"updated_at": "2019-05-20 20:56:50",
					"id": 5
				}
			}
			

### Apagar Imagem do Produto [DELETE]

- Parameters

	- id: 1 (number) - ID do arquivo

- Request (application/json)

	- Headers

			Authentication: Bearer JWT


- Response 200 (application/json; charset=utf-8)

	- Attributes(MessageResponse)

	- Body			

			{
				"message": "Imagem excluída com sucesso "
			}


## Enviar Imagem do Produto	 [/files/]			
### Enviar Imagem do Produto [POST]
O envio do arquivo deve ser feito atráves de form-data (multipart/form-data). O nome da variável deve ser file

- Request (multipart/form-data; boundary=---BOUNDARY)

        -----BOUNDARY
        Content-Disposition: form-data; name="file[file]"; filename="image.jpg"
        Content-Type: image/jpeg
        Content-Transfer-Encoding: base64

        /9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0a
        HBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIy
        MjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIA
        AhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEB
        AAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AL+AD//Z
        -----BOUNDARY

	
	- Headers

			Authentication: Bearer JWT	
		
- Response 200 (application/json; charset=utf-8)

	- Attributes(FileResponse)

	- Body
	
			{
				"file": {
					"file": "1557088194989.jpeg",
					"name": "0_11b748_d4d498a0_XXL.jpg",
					"type": "image",
					"subtype": "jpeg",
					"created_at": "2019-05-05 17:29:54",
					"updated_at": "2019-05-05 17:29:54",
					"id": 1
				}	
			}
			
# Group Produtos
Rota com as categorias de produtos da Pizzaria
			
## Produtos [/produtos]

### Listar Categorias [GET]

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (array[ProdutosResponse])

	- Body			

			[
				{
					"id": 1,
					"nome": "",
					"descricao": "",
					"tempo_estimado": 0,
					"file_id": 5,
					"created_at": "2019-06-30 09:25:01",
					"updated_at": "2019-06-30 09:25:01",
					"file": {
					  "id": 5,
					  "file": "1561896613432.png",
					  "name": "03a11555328101.59803b89a0624.png",
					  "type": "image",
					  "subtype": "png",
					  "created_at": "2019-06-30 09:10:13",
					  "updated_at": "2019-06-30 09:10:13",
					  "url": "http://192.168.0.100:3333/files/5"
					}
				},
				{
					"id": 2,
					"nome": "teste3",
					"descricao": "Cervejas artesanais, vinhos e destilados.",
					"tempo_estimado": 5,
					"file_id": 5,
					"created_at": "2019-06-30 09:27:17",
					"updated_at": "2019-06-30 09:27:17",
					"file": {
						"id": 5,
						"file": "1561896613432.png",
						"name": "03a11555328101.59803b89a0624.png",
						"type": "image",
						"subtype": "png",
						"created_at": "2019-06-30 09:10:13",
						"updated_at": "2019-06-30 09:10:13",
						"url": "http://192.168.0.100:3333/files/5"
					}
				}
			]


### Cadastrar Categoria [POST]

- Request (application/json)

	- Body

			{
				"nome": "teste3",
				"descricao": "Cervejas artesanais, vinhos e destilados.",
				"tempo_estimado": 5,
				"file_id": 5
			}


	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (ProdutoResponse)

	- Body			

			{
				"nome": "teste3",
				"descricao": "Cervejas artesanais, vinhos e destilados.",
				"tempo_estimado": 5,
				"file_id": 5,
				"created_at": "2019-06-30 09:27:17",
				"updated_at": "2019-06-30 09:27:17",
				"id": 2
			}

## Produtos [/produtos/{id_produto}]
### Ver Categoria [GET]

- Parameters

	- id_produto: 1 (number) - ID do produto	

- Request (application/json)
	
	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (ProdutoResponse)

	- Body			

			{
				"nome": "teste3",
				"descricao": "Cervejas artesanais, vinhos e destilados.",
				"tempo_estimado": 5,
				"file_id": 5,
				"created_at": "2019-06-30 09:27:17",
				"updated_at": "2019-06-30 09:27:17",
				"id": 2
			}

### Atualizar Categorias [PUT]

- Parameters

	- id_produto: 1 (number) - ID do produto	

- Request (application/json)

	- Body

			{
				"nome": "teste3",
				"descricao": "Cervejas artesanais, vinhos e destilados.",
				"tempo_estimado": 5,
				"file_id": 5
			}


	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (ProdutoResponse)

	- Body			

			{
				"nome": "teste3",
				"descricao": "Cervejas artesanais, vinhos e destilados.",
				"tempo_estimado": 5,
				"file_id": 5,
				"created_at": "2019-06-30 09:27:17",
				"updated_at": "2019-06-30 09:27:17",
				"id": 2
			}

### Excluir Categorias [DELETE]

- Parameters

	- id_produto: 1 (number) - ID do produto	

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Body			

			{
				"message":"Produto excluído com sucesso"
			}

			
# Group Tipos
Rota com os tipos de produtos de uma categoria de produtos da Pizzaria
			
## Tipos [/produtos/{id_produto}/tipos]

### Tipos de produtos por categoria [GET]

- Parameters

	- id_produto: 1 (number) - ID do produto
			
- Request (application/json)

	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (array[TiposResponse])

	- Body			
	
			[
				{
					"id": 2,
					"titulo": "",
					"produto_id": 5,
					"file_id": 5,
					"created_at": "2019-06-30 09:36:16",
					"updated_at": "2019-06-30 09:36:16",
					"file": {
					  "id": 5,
					  "file": "1561896613432.png",
					  "name": "03a11555328101.59803b89a0624.png",
					  "type": "image",
					  "subtype": "png",
					  "created_at": "2019-06-30 09:10:13",
					  "updated_at": "2019-06-30 09:10:13",
					  "url": "http://192.168.0.100:3333/files/5"
					}
				  },
				  {
					"id": 3,
					"titulo": "Frango com Catupiri",
					"produto_id": 5,
					"file_id": 5,
					"created_at": "2019-06-30 09:36:57",
					"updated_at": "2019-06-30 09:36:57",
					"file": {
					  "id": 5,
					  "file": "1561896613432.png",
					  "name": "03a11555328101.59803b89a0624.png",
					  "type": "image",
					  "subtype": "png",
					  "created_at": "2019-06-30 09:10:13",
					  "updated_at": "2019-06-30 09:10:13",
					  "url": "http://192.168.0.100:3333/files/5"
					}
				}
			]

### Cadastrar tipo de produto [POST]		  

- Parameters

	- id_produto: 1 (number) - ID do produto

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	
	- Body

			{
				"titulo": "Frango com Catupiri",
				"file_id": 5
			}	

- Response 200 (application/json; charset=utf-8)

	- Attributes (TipoResponse)

	- Body	

			{
				"titulo": "Frango com Catupiri",
				"file_id": 5,
				"produto_id": 5,
				"created_at": "2019-06-30 09:36:57",
				"updated_at": "2019-06-30 09:36:57",
				"id": 3
			}


## Tipos [/produtos/{id_produto}/tipos/{id_tipo}]			
### Ver tipo de produto [GET]	

- Parameters

	- id_produto: 1 (number) - ID do produto	  
	- id_tipo: 1 (number) - ID do tipo de produto

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	

- Response 200 (application/json; charset=utf-8)

	- Attributes (TipoResponse)

	- Body	

			{
				"titulo": "Frango com Catupiri",
				"file_id": 5,
				"produto_id": 5,
				"created_at": "2019-06-30 09:36:57",
				"updated_at": "2019-06-30 09:36:57",
				"id": 3
			}
			



### Atualizar tipo de produto [PUT]	

- Parameters

	- id_produto: 1 (number) - ID do produto	  
	- id_tipo: 1 (number) - ID do tipo de produto

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	
	- Body

			{
				"titulo": "Frango com Catupiri",
				"file_id": 5
			}	

- Response 200 (application/json; charset=utf-8)

	- Attributes (TipoResponse)

	- Body	

			{
				"titulo": "Frango com Catupiri",
				"file_id": 5,
				"produto_id": 5,
				"created_at": "2019-06-30 09:36:57",
				"updated_at": "2019-06-30 09:36:57",
				"id": 3
			}
			


### Apagar tipo de produto [DELETE]	

- Parameters

	- id_produto: 1 (number) - ID do produto	  
	- id_tipo: 1 (number) - ID do tipo de produto

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	
	- Body

		

- Response 200 (application/json; charset=utf-8)

	- Attributes (TipoResponse)

	- Body	

			{
				"message": "Tipo de produto excluído com sucesso"
			}
			
			
			
# Group Tamanhos
Rota com os tamanhos de um tipo de produto da Pizzaria
			
## Tamanhos de produtos [/produtos/{id_produto}/tipos/{id_tipo}/]

### Tamanhos de produtos por tipo [GET]

- Parameters

   - id_produto: 1 (number) - ID do produto
   - id_tipo: 1 (number) - ID do tipo de produto
         
- Request (application/json)

   - Headers

         Authentication: Bearer JWT
      

- Response 200 (application/json; charset=utf-8)

   - Attributes (TipoResponse)

   - Body         
         
        
           {
               "id": 2,
               "titulo": "",
               "produto_id": 4,
               "file_id": 1,
               "created_at": "2019-06-30 09:37:57",
               "updated_at": "2019-06-30 09:37:57"
            }
## Tamanhos de produtos  [/produtos/{id_produto}/tipos/{id_tipo}/tamanhos/] 
### Cadastrar tamanho de produto [POST]		  

- Parameters

	- id_produto: 1 (number) - ID do produto
	- id_tipo: 1 (number) - ID do tipo do produto


- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	
	- Body

		 	{
				"titulo": "Pequena",
				"valor": "29",
				"file_id": 1
			}

- Response 200 (application/json; charset=utf-8)

	- Attributes (TamanhoResponse)

	- Body	

			{
				"titulo": "Pequena",
				"valor": 29,
				"file_id": 1,
				"produto_tipo_id": 4,
				"created_at": "2019-06-30 09:40:41",
				"updated_at": "2019-06-30 09:40:41",
				"id": 3
			}

## Tamanhos [/produtos/{id_produto}/tipos/{id_tipo}/tamanhos/{id_tamanho}/]			
### Ver tamanho de produto [GET]		

- Parameters

	- id_produto: 1 (number) - ID do produto
	- id_tipo: 1 (number) - ID do tipo do produto			
	- id_tamanho: 1 (number) - ID do tamanho do produto

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	
	
- Response 200 (application/json; charset=utf-8)

	- Attributes (TamanhoResponse)

	- Body	

			{
				"titulo": "Pequena",
				"valor": "29",
				"file_id": 1,
				"produto_tipo_id": "4",
				"created_at": "2019-06-30 09:40:41",
				"updated_at": "2019-06-30 09:40:41",
				"id": 3
			}



### Atualizar tamanho de produto [PUT]		

- Parameters

	- id_produto: 1 (number) - ID do produto
	- id_tipo: 1 (number) - ID do tipo do produto			
	- id_tamanho: 1 (number) - ID do tamanho do produto
	- id_registro: 1 (number) - ID do registro

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	
	- Body

		 	{
				"titulo": "Pequena",
				"valor": "29",
				"file_id": 1
			}

- Response 200 (application/json; charset=utf-8)

	- Attributes (TamanhoResponse)

	- Body	

			{
				"titulo": "Pequena",
				"valor": 29,
				"file_id": 1,
				"produto_tipo_id": 4,
				"created_at": "2019-06-30 09:40:41",
				"updated_at": "2019-06-30 09:40:41",
				"id": 3
			}

			

### Apagar tamanho de produto [DELETE]		

- Parameters

	- id_produto: 1 (number) - ID do produto
	- id_tipo: 1 (number) - ID do tipo do produto			
	- id_tamanho: 1 (number) - ID do tamanho do produto
	- id_registro: 1 (number) - ID do registro

- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	
	- Body

- Response 200 (application/json; charset=utf-8)


	- Body	

			{
				"message": "Tamanho de Produto excluído com sucesso"
			}
			
			
# Group Pedidos
Rota com os pedidos feitos na Pizzaria
			
## Pedidos [/pedidos]

### Listar Pedidos [GET]
			
- Request (application/json)

	- Headers

			Authentication: Bearer JWT
	
	- Parameters

		- status: `PENDENTE` (string, optional) - Status do pagamento do pedido
	

- Response 200 (application/json; charset=utf-8)

	- Attributes (array[PedidosResponse])

	- Body			
		
			[
				{
					"id": 18,
					"cep": "01532001",
					"rua": "R CASTRO ALVES",
					"numero": "11",
					"bairro": "ACLIMACAO",
					"cidade": "",
					"estado": "",
					"valor": 29,
					"observacao": "bins",
					"user_id": 7,
					"created_at": "2019-07-01 20:49:26",
					"updated_at": "2019-07-01 20:49:26",
					"user": {
					  "id": 7,
					  "username": "teste",
					  "email": "teste@teste.com.br",
					  "password": "$2a$10$tN6OUF2XaqmNhodHpbplsOxjIUprWmy88TUMesZvZW.2YZUVNmFy2",
					  "type": "USUARIO",
					  "created_at": "2019-06-30 10:47:21",
					  "updated_at": "2019-06-30 10:47:21"
					},
					"produtos": [
					  {
						"id": 16,
						"produto_tamanho_id": 3,
						"titulo": "Frango com Catupiri",
						"tamanho": "Pequena",
						"valor": 29,
						"imagem": "http://0.0.0.0:3333/files/1",
						"pedido_id": 18,
						"created_at": "2019-07-01 20:49:27",
						"updated_at": "2019-07-01 20:49:27",
						"produto_id": 5,
						"produto_tipo_id": 4
					  }
					]
				  },
				  {
					"id": 19,
					"cep": "01532001",
					"rua": "R CASTRO ALVES",
					"numero": "11",
					"bairro": "ACLIMACAO",
					"cidade": "",
					"estado": "",
					"valor": 29,
					"observacao": "bins",
					"user_id": 7,
					"created_at": "2019-07-01 20:49:26",
					"updated_at": "2019-07-01 20:49:26",
					"user": {
					  "id": 7,
					  "username": "teste",
					  "email": "teste@teste.com.br",
					  "password": "$2a$10$tN6OUF2XaqmNhodHpbplsOxjIUprWmy88TUMesZvZW.2YZUVNmFy2",
					  "type": "USUARIO",
					  "created_at": "2019-06-30 10:47:21",
					  "updated_at": "2019-06-30 10:47:21"
					},
					"produtos": [
					  {
						"id": 17,
						"produto_tamanho_id": 3,
						"titulo": "Frango com Catupiri",
						"tamanho": "Pequena",
						"valor": 29,
						"imagem": "http://0.0.0.0:3333/files/1",
						"pedido_id": 18,
						"created_at": "2019-07-01 20:49:27",
						"updated_at": "2019-07-01 20:49:27",
						"produto_id": 5,
						"produto_tipo_id": 4
					  }
					]
				}
			]

### Gravar Pedido [POST]
			
- Request (application/json)

	- Headers

			Authentication: Bearer JWT
		

	- Body	
	
			{
				"observacao": "Teste pedido",
				"rua": "RUA CASTRO ALVES",
				"numero": "1",
				"bairro": "ACLIMACAO",
				"estado": "SP",
				"cep": "01532001",
				"valor": 29,
				"status": "PENDENTE",
				"user_id": 1,
				"produtos": [
					{
						"produto_tamanho_id": "1",
						"titulo": "TESTE",
						"tamanho": "PEQUENO",
						"valor": "10",
						"imagem": "http://0.0.0.0:3333/files/1",
						"produto_id": 1,
						"produto_tipo_id": "1"
					},
					{
						"produto_tamanho_id": "1",
						"titulo": "TESTE",
						"tamanho": "PEQUENO",
						"valor": "10",
						"imagem": "http://0.0.0.0:3333/files/1",
						"produto_id": 1,
						"produto_tipo_id": "1"
					}
				]
				
			}
		
- Response 200 (application/json; charset=utf-8)

	- Attributes (MessageResponse)

	- Body			

			{
				message: "Pedido gravado com sucesso!"
			}

## Pedido [/pedidos/{id}]

### Ver Pedido [GET]

- Parameters

	- id: 1 (number) - ID do pedido
			
- Request (application/json)

	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (PedidosResponse)

	- Body			
		
			{
				"id": 18,
				"cep": "01532001",
				"rua": "R CASTRO ALVES",
				"numero": "11",
				"bairro": "ACLIMACAO",
				"cidade": "",
				"estado": "",
				"valor": 29,
				"observacao": "bins",
				"user_id": 7,
				"status": "PENDENTE",
				"created_at": "2019-07-01 20:49:26",
				"updated_at": "2019-07-01 20:49:26",
				"user": {
					"id": 7,
					"username": "teste",
					"email": "teste@teste.com.br",
					"password": "$2a$10$tN6OUF2XaqmNhodHpbplsOxjIUprWmy88TUMesZvZW.2YZUVNmFy2",
					"type": "USUARIO",
					"created_at": "2019-06-30 10:47:21",
					"updated_at": "2019-06-30 10:47:21"
				},
				"produtos": [
					{
						"id": 16,
						"produto_tamanho_id": 3,
						"titulo": "Frango com Catupiri",
						"tamanho": "Pequena",
						"valor": 29,
						"imagem": "http://0.0.0.0:3333/files/1",
						"pedido_id": 18,
						"created_at": "2019-07-01 20:49:27",
						"updated_at": "2019-07-01 20:49:27",
						"produto_id": 5,
						"produto_tipo_id": 4
					  }
				]
			}

### Atualizar Endereço, Status e Observação [PUT]

- Parameters

	- id: 1 (number) - ID do pedido
			
- Request (application/json; charset=utf-8)

	- Headers

			Authentication: Bearer JWT
	
	- Body	
	
			{
				"observacao": "Teste pedido",
				"rua": "RUA CASTRO ALVES",
				"numero": "1",
				"bairro": "ACLIMACAO",
				"estado": "SP",
				"cep": "01532001",
				"status": "PAGO"
			}
			

- Response 200 (application/json; charset=utf-8)

	- Attributes (array[PedidosResponse])

	- Body			
		
			{
				"id": 18,
				"cep": "01532001",
				"rua": "R CASTRO ALVES",
				"numero": "11",
				"bairro": "ACLIMACAO",
				"cidade": "",
				"estado": "",
				"valor": 29,
				"observacao": "bins",
				"status": "PAGO",
				"user_id": 7,
				"created_at": "2019-07-01 20:49:26",
				"updated_at": "2019-07-01 20:49:26",
				"user": {
					"id": 7,
					"username": "teste",
					"email": "teste@teste.com.br",
					"password": "$2a$10$tN6OUF2XaqmNhodHpbplsOxjIUprWmy88TUMesZvZW.2YZUVNmFy2",
					"type": "USUARIO",
					"created_at": "2019-06-30 10:47:21",
					"updated_at": "2019-06-30 10:47:21"
				},
				"produtos": [
					{
						"id": 16,
						"produto_tamanho_id": 3,
						"titulo": "Frango com Catupiri",
						"tamanho": "Pequena",
						"valor": 29,
						"imagem": "http://0.0.0.0:3333/files/1",
						"pedido_id": 18,
						"created_at": "2019-07-01 20:49:27",
						"updated_at": "2019-07-01 20:49:27",
						"produto_id": 5,
						"produto_tipo_id": 4
					}
				]
			}

			
### Excluir Pedido [DELETE]

- Parameters

	- id: 1 (number) - ID do pedido
			
- Request (application/json)

	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (MessageResponse)

	- Body			
		
			{
				"message": "Pedido excluído com sucesso"
			}
			
## Pedidos do usuário [/pedidos/app/user]

### Pedidos do usuário logado no aplicativo [GET]
			
- Request (application/json)

	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (array[PedidosResponse])

	- Body			
		
			[
				{
					"id": 18,
					"cep": "01532001",
					"rua": "R CASTRO ALVES",
					"numero": "11",
					"bairro": "ACLIMACAO",
					"cidade": "",
					"estado": "",
					"valor": 29,
					"observacao": "bins",
					"status": "PENDENTE",
					"user_id": 7,
					"created_at": "2019-07-01 20:49:26",
					"updated_at": "2019-07-01 20:49:26",
					"user": {
					  "id": 7,
					  "username": "teste",
					  "email": "teste@teste.com.br",
					  "password": "$2a$10$tN6OUF2XaqmNhodHpbplsOxjIUprWmy88TUMesZvZW.2YZUVNmFy2",
					  "type": "USUARIO",
					  "created_at": "2019-06-30 10:47:21",
					  "updated_at": "2019-06-30 10:47:21"
					},
					"produtos": [
					  {
						"id": 16,
						"produto_tamanho_id": 3,
						"titulo": "Frango com Catupiri",
						"tamanho": "Pequena",
						"valor": 29,
						"imagem": "http://0.0.0.0:3333/files/1",
						"pedido_id": 18,
						"created_at": "2019-07-01 20:49:27",
						"updated_at": "2019-07-01 20:49:27",
						"produto_id": 5,
						"produto_tipo_id": 4
					  }
					]
				},
				{
					"id": 19,
					"cep": "01532001",
					"rua": "R CASTRO ALVES",
					"numero": "11",
					"bairro": "ACLIMACAO",
					"cidade": "",
					"estado": "",
					"valor": 29,
					"observacao": "bins",
					"status": "PENDENTE",
					"user_id": 7,
					"created_at": "2019-07-01 20:49:26",
					"updated_at": "2019-07-01 20:49:26",
					"user": {
					  "id": 7,
					  "username": "teste",
					  "email": "teste@teste.com.br",
					  "password": "$2a$10$tN6OUF2XaqmNhodHpbplsOxjIUprWmy88TUMesZvZW.2YZUVNmFy2",
					  "type": "USUARIO",
					  "created_at": "2019-06-30 10:47:21",
					  "updated_at": "2019-06-30 10:47:21"
					},
					"produtos": [
					  {
						"id": 17,
						"produto_tamanho_id": 3,
						"titulo": "Frango com Catupiri",
						"tamanho": "Pequena",
						"valor": 29,
						"imagem": "http://0.0.0.0:3333/files/1",
						"pedido_id": 18,
						"created_at": "2019-07-01 20:49:27",
						"updated_at": "2019-07-01 20:49:27",
						"produto_id": 5,
						"produto_tipo_id": 4
					  }
					]
				}
			]

			
## Dashboard [/pedidos/admin/dashboard]

### Indicadores do sistema [GET]
			
- Request (application/json)

	- Headers

			Authentication: Bearer JWT
		

- Response 200 (application/json; charset=utf-8)

	- Attributes (DashboardResponse)

	- Body			
			
			{
				"pedidos":5,
				"usuarios":5,
				"recebido":40,
				"pendente":0,
				"ticket_medio":8,
				"categorias":5,
				"tipos":7,
				"tamanhos":7,
				"mais_vendidos":[
					{
						"categoria":"Pizzas",
						"tipo":"Portuguesa",
						"tamanho":"Grande",
						"total":40
					}
					
				]
			}

# Data Structures

## UsuarioResponse (object)

- id (number) - ID do usuário
- username (string) - Nome do usuário
- email (string) - E-mail do usuário, deve ser único
- type (string) - Tipo de usuário (ADMIN ou USUARIO)
- password (string) - Senha criptografada
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- id_google (string, nullable) - ID no Google
- id_facebook (string, nullable) - ID no Facebook

## TokenResponse (object)

- type (string) - tipo de token
- token (string) - Token criptografado
- refreshToken (string, nullable) - Tempo de vida do token

## LoginResponse (object)

- message (string) - Retorno da operação
- user (UsuarioResponse) - Objeto com os dados do usuário
- token (TokenResponse) - Token criptografado

## CreateUserResponse (object)

- message (string) - Retorno da operação
- user (UsuarioResponse) - Objeto com os dados do usuário
- token (TokenResponse) - Objeto com os dados do token

## MessageResponse(object)

- Message (string) - Retorno da operação

## FileObject (object)

- id (number) - ID do arquivo
- name (string) - Nome do arquivo
- type (string) - Tipo do arquivo
- subtype (string) - Extensão do arquivo
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- url (string) - Link para acessar a imagem

## FileResponse (object)

- file (FileObject) - Objeto com os dados da imagem

## ProdutoResponse (object)

- id (number) - ID do registro
- nome (string) - Nome da categoria
- descricao (string) - Descrição da categoria
- tempo_estimado (number) -Tempo estimado
- file_id (number) - ID do arquivo
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- file (FileObject) - Imagem do tipo de produto

## ProdutosResponse (object)

- id (number) - ID do registro
- nome (string) - Nome da categoria
- descricao (string) - Descrição da categoria
- tempo_estimado (number) -Tempo estimado
- file_id (number) - ID do arquivo
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização

## TiposResponse (object)

- id (number) - ID do registro
- titulo(string) - Nome do tipo de produto
- produto_id (number) - ID da categoria do produto
- file_id (number) - ID da imagem
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- file (FileObject) - Imagem do tipo de produto

## TipoResponse (object)

- id (number) - ID do registro
- titulo(string) - Nome do tipo de produto
- produto_id (number) - ID da categoria do produto
- file_id (number) - ID da imagem
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização

## TamanhosResponse (object)

- id (number) - ID do registro
- titulo(string) - Nome do tipo de produto
- produto_id (number) - ID da categoria do produto
- file_id (number) - ID da imagem
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- file (FileObject) - Imagem do tipo de produto
- tipos (string) - vazio

## TamanhoResponse (object)  
  
- id (number) - ID do registro
- titulo(string) - Nome do tamanho do tipo de produto
- valor (number) - Valor deste tipo de tamanho de produto
- file_id (number) - ID da imagem
- produto_tipo_id (number) - ID do tipo de produto
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização

## ProdutoItensResponse (object)

- id (number) - ID do item do pedido
- produto_tamanho_id (number) - ID do tamanho do produto
- titulo(string) - Descrição do produto
- tamanho(string) - Descrição do tamanho do produto
- valor (number) - valor do item do pedido
- imagem(string) - Link para a imagem do produto
- pedido_id (number) - ID do pedido
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- produto_id (number) - ID da categoria de produto
- produto_tipo_id (number) - ID do tipo de produto

## PedidosResponse (object) 

- id (number) - ID do pedido
- cep(string) - CEP do cliente
- rua(string) - endereço do cliente
- numero(string) - Número do endereço do cliente
- bairro(string) - Bairro do cliente
- cidade(string) - Cidade do cliente
- estado(string) - Estado do cliente
- valor (number) - valor total do pedido
- observacao(string) - Observação sobre o pedido
- status(string) - Status de pagamento do pedido. Valor padrão: Pendente
- user_id (number) - ID do usuário
- created_at (string) - Data de criação
- updated_at (string) - Data de atualização
- user (UsuarioResponse) - Objeto com os dados do usuário
- produtos (array[TiposResponse]) - Itens do pedido

## DashboardResponse (object)

- pedidos (number, nullable) - Quantidade de pedidos
- usuarios (number, nullable) - Quantidade de usuários
- recebido (number, nullable) - Valor Recebido
- pendente (number, nullable) - Valor a Receber
- ticket_medio (number, nullable) - Valor médio gasto por cliente
- categorias (number, nullable) - Total de categorias de produtos
- tipos (number, nullable) - Total de tipos de produtos
- tamanhos (number, nullable) - Total de tamanhos de produtos
- mais_vendidos: (array) - Array com os produtos mais vendidos por quantidade