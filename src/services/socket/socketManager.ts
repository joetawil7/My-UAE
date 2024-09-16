import { io, Socket } from 'socket.io-client';
import {
  DeletedNotificationEvent,
  Events,
  NewMessageEvent,
  SocketEvent,
  TypingMessageEvent,
  UserNotification,
} from '@types';
import { EventRegister } from 'react-native-event-listeners';

class SocketManager {
  public get connectionFailed(): boolean {
    return this._connectionFailed;
  }

  public _socket!: Socket;

  private _connectionFailed = false;

  public connect(accessToken: string): void {
    this._socket = io('https://pocapi-dev.azurewebsites.net/', {
      transports: ['websocket', 'polling'],
      extraHeaders: {
        token: accessToken,
      },
    });

    this._socket.on('connect_error', () => {
      this._connectionFailed = true;
    });

    this._socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        this._socket.connect();
      }
    });

    this.subscribeAll();
  }

  public disconnect(): void {
    this._socket.disconnect();
  }

  public subscribeAll(): void {
    this.subscribeNewNotification();
    this.subscribeDeletedNotification();
    this.subscribeTypingMessage();
    this.subscribeNewMessage();
  }

  private subscribeNewNotification() {
    this._socket.on(
      SocketEvent.NewNotification,
      (notification: UserNotification) => {
        EventRegister.emit(Events.NEW_NOTIFICATION, { notification });
      }
    );
  }

  private subscribeDeletedNotification() {
    this._socket.on(
      SocketEvent.DeletedNotification,
      (event: DeletedNotificationEvent) => {
        EventRegister.emit(Events.DELETED_NOTIFICATION, {
          id: event.id,
          actionId: event.actionId,
        });
      }
    );
  }

  private subscribeTypingMessage() {
    this._socket.on(SocketEvent.TypingMessage, (event: TypingMessageEvent) => {
      EventRegister.emit(Events.TYPING_MESSAGE, {
        userId: event.userId,
      });
    });
  }

  private subscribeNewMessage() {
    this._socket.on(SocketEvent.NewMessage, (event: NewMessageEvent) => {
      EventRegister.emit(Events.NEW_MESSAGE, {
        userId: event.userId,
      });
    });
  }
}

export const socketManager = new SocketManager();
