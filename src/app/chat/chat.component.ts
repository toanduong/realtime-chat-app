import { Component, OnInit, OnDestroy } from '@angular/core';
import { StreamService } from '../services/stream.service';
import { Channel, StreamChat } from 'stream-chat';
import {
  ChannelService,
  ChatClientService,
  StreamAutocompleteTextareaModule,
  StreamChatModule,
  StreamI18nService,
} from 'stream-chat-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chat',
  imports: [
    TranslateModule,
    StreamAutocompleteTextareaModule,
    StreamChatModule
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatClient!: StreamChat;
  channels: Channel[] = [];
  selectedChannel: Channel | null = null;
  messages: any[] = [];
  newMessage: string = '';
  userId: string = '';

  constructor(private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,) {

      const userId = localStorage.getItem('userid');
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('chat-token');
      console.log(userId);
      if (userId !== null) {
        const apiKey = '7fxyyfbvwwae';
        this.userId = userId;
        const userToken = token;

        const user = {
          id: userId,
          name: username,
          image: `https://getstream.io/random_png/?name=${username}`,
        };

        this.chatService.init(apiKey, userId, userToken);
        this.streamI18nService.setTranslation();
      }
    }

  async ngOnInit() {
    this.channelService.init({
      type: 'messaging',
      members: { $in: [this.userId] },
    });
  }
}
