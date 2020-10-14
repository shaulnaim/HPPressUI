import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { LoggerService } from './logger.service';

@Injectable()
export class RestService {
  constructor(private _logger: LoggerService, private _http: HttpClient) {}

  public get(uri: string, keys: any = null, param: any = null): Promise<any> {
    const searchParams = new HttpParams();
    if (param != null) {
      searchParams.append('data', JSON.stringify(param));
    }
    const response = this._http.get(uri, {
      observe: keys != null ? keys : '',
      params: searchParams
    });
    return response.toPromise();
  }

  public post(uri: string, data: any): Promise<any> {
    const sData = this.buildData(data);
    const response = this._http.post(uri, sData);
    return response.toPromise();
  }

  public put(uri: string, data?: any): Promise<any> {
    const sData = this.buildData(data);
    const response = this._http.put(uri, sData);
    return response.toPromise();
  }

  public delete(uri: string, key: any): Promise<any> {
    // httpClient delete does not get body, use request instead
    const response = this._http.request('delete', uri, { body: key });
    return response.toPromise();
  }

  private buildData(data: any): string {
    return data !== null ? JSON.stringify(data) : null;
  }
}
