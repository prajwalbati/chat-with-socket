import { Injectable } from "@angular/core";
import { User, WsMessage } from "@chat-with-socket/types";
import { BehaviorSubject } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class AppService {

    user$: BehaviorSubject<User>;
    socket: WebSocketSubject<WsMessage>;

    connect(name: string) {
        this.socket = webSocket(`ws://localhost:8080?name=${name}`);
        this.socket.subscribe(message => this.onMessageFromServer(message));
    }

    onMessageFromServer(message: WsMessage | any) {
        console.log('From server:')
        console.log(message);
        switch(message.event) {
            case 'login': {
                this.user$ = message.user;
                break;
            }
        }
    }
};