import { RestService } from 'hp-services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalibrationServicesService {
  public restService: RestService;

  beginScope(): Promise<string> {
    return this.restService.put(`CalibrationServices/begin-scope`);
  }

  endScope(scopeId: string): Promise<void> {
    return this.restService.put(`CalibrationServices/end-scope`, scopeId);
  }

  constructor(restService: RestService) {
    this.restService = restService;
  }
}
