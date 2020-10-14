import { EventEmitter } from '@angular/core';

import { LoggerService } from './logger.service';

export class WebSocketService {
  public onMessage = new EventEmitter<string>();
  private _ws: WebSocket;

  constructor(private _wsURL: string, private _logger: LoggerService) {
    this.createWebSocket();
  }

  public send(data: string) {
    if (this._ws.readyState === WebSocket.OPEN) {
      this._ws.send(data);
    }
  }

  private createWebSocket() {
    this._logger.info(this._wsURL);
    this._ws = new WebSocket(this._wsURL);
    this._ws.onopen = e => {
      this._logger.info('ws  opened');
    };
    this._ws.onclose = e => {
      this._logger.info('ws closed');
      setTimeout(() => window.location.reload(), 3000);
    };
    this._ws.onerror = e => {
      this._logger.error('Error in web socket', e);
    };
    this._ws.onmessage = message => {
      this._logger.info('ws got message from server', message);
      this.onMessage.emit(message.data);
    };
  }
}
