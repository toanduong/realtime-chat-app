// stream.service.ts
import { Injectable } from '@angular/core';
import { StreamChat } from 'stream-chat';

@Injectable({ providedIn: 'root' })
export class StreamService {
  private chatClient!: StreamChat;

  async init(apiKey: string) {
    this.chatClient = StreamChat.getInstance(apiKey);
  }

  async connectUser(userId: string, userToken: string) {
    await this.chatClient.connectUser(
      { id: userId, name: userId }, // you can expand this with avatar, etc.
      userToken
    );
  }

  getClient(): StreamChat {
    return this.chatClient;
  }

  async disconnect() {
    if (this.chatClient) {
      await this.chatClient.disconnectUser();
    }
  }
}
