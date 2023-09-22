import { Injectable } from "@angular/core";
import { User, WsMessage } from "@chat-with-socket/types";
import { BehaviorSubject } from "rxjs";
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable()
export class AppService {

    socket: WebSocketSubject<WsMessage>;
    public user$: BehaviorSubject<User> = new BehaviorSubject<User>({id:0, name:''});
    public messages$: BehaviorSubject<WsMessage[]> = new BehaviorSubject<WsMessage[]>([]);

    connect(name: string) {
        this.socket = webSocket(`ws://localhost:8080?name=${name}`);
        this.socket.subscribe(message => this.onMessageFromServer(message));
    }

    onMessageFromServer(message: WsMessage | any) {
        console.log('From server:')
        console.log(`Event: ${message.event}, Msg: ${message.contents}`);

        switch(message.event) {
            case 'login':
                // this.user$ = message.user;
                console.log("call next on user login");
                this.user$.next(message.user);
                break;
            case 'chat':
                console.log("call next on message chat");
                this.messages$.next(message);
                break;
            default:
                console.log("Default");
        }
    }
};