import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { uuid } from 'uuid';

import { environment as env } from 'devEnv';
import { IServerMessageContent, ClientConnected } from 'hp-patterns-base-classes';
import { WebSocketService } from './websocket.service';
import { LoggerService } from './logger.service';

export enum SERVER_MESSAGE_TYPES {
  ResourceNotification = 'ResourceNotification',
  Connect = 'Connect'
}

export interface IServerMessage {
  Type: SERVER_MESSAGE_TYPES;
  ResourceName: string;
  SubscriptionId: uuid;
  Content: IServerMessageContent;
}

@Injectable()
export class NotificationService {
  public onUIData$: Observable<IServerMessage>;
  public onClientConnected$: Observable<ClientConnected>;
  private onServerMessage$: Observable<IServerMessage>;
  private _wsService: WebSocketService;

  constructor(private _logger: LoggerService) {
    const wsURL = `ws://${window.location.hostname}:${env.REST_PORT}/ws`;
    this._wsService = new WebSocketService(wsURL, _logger);

    this.onServerMessage$ = this._wsService.onMessage.pipe(
      filter((msg: string) => msg !== null),
      map((msg: string) => JSON.parse(msg) as IServerMessage)
    );

    this.onUIData$ = this.onServerMessage$.pipe(
      filter(
        (serverMessage: IServerMessage) => serverMessage.Type === SERVER_MESSAGE_TYPES.ResourceNotification
      )
    );

    this.onClientConnected$ = this.onServerMessage$.pipe(
      filter((serverMessage: IServerMessage) => serverMessage.Type === SERVER_MESSAGE_TYPES.Connect),
      map((serverMessage: IServerMessage) => serverMessage.Content as ClientConnected)
    );
  }
}
