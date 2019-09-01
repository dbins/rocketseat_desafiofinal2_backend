const fs = require("fs");
const http = require('http');
const Multipart = require("multi-part");
const streamToString = require("stream-to-string");
var FormData = require('form-data');

	
var form = new FormData();
form.append('file', fs.createReadStream("./resources/imagens/pizzas/1.png"));

//Converter stream em string
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

console.log(data);

form.submit({
  host: '192.168.0.100',
  port: '3333',
  path: '/files'
}, function(err, res) {
	if (err){
		console.log(err);
		return;
	}	
  console.log(res.statusCode);
  console.log('teste 1');
});

var form2 = new FormData();
form2.append('file', fs.createReadStream("./resources/imagens/pizzas/1.png"));

var request = http.request({
  method: 'post',
  host: '192.168.0.100',
  port: '3333',
  path: '/files',
  headers: form2.getHeaders()
});
 
form2.pipe(request);
 
request.on('response', function(res) {
  console.log(res.statusCode);
  console.log('teste 2');
});