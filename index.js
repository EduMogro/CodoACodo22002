// importamos los módulos necesarios
const http = require('http');
const mime = require('mime');
const path = require('path');
const fs = require('fs');

// establecemos el puerto de escucha de nuestro servidor
const port = 3000;

// creamos la función que manejará las solicitudes
function webServer(req, res) {
  if(req.method === 'GET'){
    const fileRequested = path.join(__dirname, 'public', req.url + 'index.html');
    fs.readFile(fileRequested, (err, data) => {
      if(err) {
        res.writeHead(404);
        res.end(JSON.stringify(err) + 'error');
        return;
      }
      const mimeType = mime.getType(fileRequested);
      const headers = {
        'content-type': mimeType
      };
      res.writeHead(200, headers);
      res.end(data);
    });
  }
  if(req.method === 'POST') {
    req
      .on('data', data => {
        dataString += data;
      })
      .on('end', () => {
        const templateString = `los datos que enviaste por POST como string son: ${dataString}`
        console.log(templateString);
        const headers = {
          'content-type': 'text/plain'
        };
        res.writeHead(201, headers);
        res.end(templateString);
      });
  }
}

// instanciamos el servidor
const server = http.createServer(webServer);

// levantamos el servidor en el puerto establecido
server.listen(port, () => {
  console.log(`OK`);
});