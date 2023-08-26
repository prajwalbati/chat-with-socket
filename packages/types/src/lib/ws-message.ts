import { User } from "./user";

export type WsMessage = ChatRelayMessage | ChatMessage | SystemNotice;

export interface ChatMessage {
    contents: string;
    event: 'chat';
};

export interface ChatRelayMessage {
    contents: string;
    author: User;
    event: 'chatRelay'
}

export interface SystemNotice {
    event: 'systemNotice',
    contents: string;
}