import { Injectable } from "@angular/core";
import { ChatRelayMessage, User, WsMessage } from "@chat-with-socket/types";
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

        switch(message.event) {
            case 'login':
                this.user$.next(message.user);
                break;
            case 'chat':
                let messages1 = this.messages$.value;
                messages1.push(message);
                this.messages$.next(messages1);
                break;
            case 'chatRelay':
                let messages = this.messages$.value;
                messages.push(message);
                this.messages$.next(messages);
                break;
            default:
                console.log("Default");
        }
    }

    sendMessage(message: string) {
        let chatMessage: WsMessage = {
            contents: message,
            author: this.user$.value,
            event: 'chatRelay'
        };
        this.socket.next(chatMessage);
    }
};