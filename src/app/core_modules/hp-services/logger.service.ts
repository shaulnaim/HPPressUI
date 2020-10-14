import { Injectable } from '@angular/core';

@Injectable()
export class LoggerService {
  public error(message?: any, ...optionalParams: any[]) {
    console.error(message);
  }

  public info(message?: any, ...optionalParams: any[]) {
    console.info(message);
  }

  public debug(message?: any, ...optionalParams: any[]) {
    console.log(message, ...optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]) {
    console.warn(message);
  }
}
