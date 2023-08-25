import { IncomingMessage } from 'http';
import { WebSocket, WebSocketServer, ServerOptions, RawData} from 'ws';

export class WsHandler {
    private wsServer: WebSocketServer;

    initialize(options: ServerOptions) {
        this.wsServer = new WebSocketServer(options);

        this.wsServer.on('listening', () => {
            console.log(`Server listening on port: ${options.port}`);
        });

        this.wsServer.on('connection', (socket, request) => {
            this.onSocketConnected(socket, request);
        });
    };

    onSocketConnected(socket: WebSocket, request: IncomingMessage) {
        console.log("New websocket connection");

        socket.on('message', (data: RawData) => {
            this.onSocketMessage(socket, data);
        });

        socket.on('close', (code, reason) => {
            this.onSocketClosed(code, reason);
        })
    };

    onSocketMessage(socket: WebSocket, data: RawData) {
        const payload = JSON.parse(`${data}`);
        console.log(payload);

        const reply = JSON.stringify({ reply: 'Message received'});
        socket.send(reply);
    }

    onSocketClosed(code, reason) {
        console.log(`Client has disconnected. Code: ${code}, Reason: ${reason}`);
    }
}