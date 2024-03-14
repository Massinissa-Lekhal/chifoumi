import http from 'http';
import RequestController from './controllers/RequestController.js';
import {Server as ServerIO} from 'socket.io';
import IOcontroller from './controllers/IOcontroller.js';

const server = http.createServer(
	(request, response) => {new RequestController(request, response).handleRequest()}
);
const IO = new ServerIO(server);
const controller = new IOcontroller(IO);
IO.on('connection',(socket)=>{controller.registerSocket(socket);});
//IO.on('connection',controller.registerSocket.bind(controller) );

server.listen(8080);
