const fs = require("fs");
const http = require('http');
const Multipart = require("multi-part");
const streamToString = require("stream-to-string");
var FormData = require('form-data');

const form = new Multipart();
form.append(
      "file",
      fs.createReadStream("./resources/imagens/pizzas/1.png")
    );
	
var form2 = new FormData();
form2.append('file', fs.createReadStream("./resources/imagens/pizzas/1.png"));
	
const conteudo = streamToString(form.getStream(), function (err, msg) {
    //console.log(msg)
	const tamanho = msg.length;
	const contentType = form.getHeaders()["content-type"];
	const contentLength = tamanho;
	console.log(contentType);
	console.log(contentLength);
	console.log(form.getHeaders());
	
	const options = {
	  hostname: '192.168.0.100',
	  port: '3333',
	  path: '/files',
	  method: 'POST',
	  headers: {
		'Content-Type': contentType,
		'Content-Length': tamanho
	  }
	}

	//const req = http.request(options, (res) => {
	//  console.log(`statusCode: ${res.statusCode}`)

	//  res.on('data', (d) => {
	//	console.log(d);
	//  })
	//});
	
	 var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
	});
	
	//req.on('error', (error) => {
	//	console.error(error)
	//})
	
	// post the data
	req.write(msg);
	req.end();

});

