import { Component, OnInit } from '@angular/core';
import { ChatRelayMessage, User } from '@chat-with-socket/types';
import { AppService } from './app.service';

@Component({
  selector: 'chat-with-socket-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'I am angular';

  messages: ChatRelayMessage[] = [];
  currentUser: User;

  constructor(private appService: AppService) {

  }

  ngOnInit(): void {
      this.messages = [
        { event: 'chatRelay', author: {name: 'Jane', id: 1}, contents: 'Hi this is Jane'},
        { event: 'chatRelay', author: {name: 'Henry', id: 1}, contents: 'Hi this is Henry'}
      ];

      // this.currentUser = {};
      this.appService.user$.subscribe(user => this.currentUser = user);
  }

  connect(userNameInput: HTMLInputElement) {
    const name = userNameInput.value;
    console.log(`connecting as ${name}`);
    this.appService.connect(name);
  }
}
