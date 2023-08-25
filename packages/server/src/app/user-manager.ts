import { WsMessage } from '@chat-with-socket/types';
import { WebSocket } from 'ws';

export class UserManager {
    private sockets = new Set<WebSocket>();

    add(socket: WebSocket) {
        this.sockets.add(socket);
    }

    remove(socket: WebSocket) {
        this.sockets.delete(socket);
    }

    send(socket: WebSocket, message: WsMessage) {
        const data = JSON.stringify(message);
        socket.send(data);
    }

    sendToAll(message) {
        const data = JSON.stringify(message);

        this.sockets.forEach(socket => {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(data);
            }
        });
    }

}