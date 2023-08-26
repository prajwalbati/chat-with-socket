import { Component, OnInit } from '@angular/core';
import { ChatRelayMessage, User } from '@chat-with-socket/types';

@Component({
  selector: 'chat-with-socket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'I am angular';

  messages: ChatRelayMessage[] = [];
  currentUser: User;

  ngOnInit(): void {
      this.messages = [
        { event: 'chatRelay', author: {name: 'Jane', id: 1}, contents: 'Hi this is Jane'},
        { event: 'chatRelay', author: {name: 'Henry', id: 1}, contents: 'Hi this is Henry'}
      ];

      // this.currentUser = {};
  }

  connect(userNameInput: HTMLInputElement) {
    console.log("connect");
    console.log(userNameInput);
  }
}
