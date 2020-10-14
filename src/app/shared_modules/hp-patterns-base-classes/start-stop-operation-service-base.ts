import { Observable } from 'rxjs';
import { ServiceBase } from './service-base';
import { NotificationService, LoggerService, RestService } from 'hp-services';

export abstract class StartStopOperationServiceBase<TStartStopOperation> extends ServiceBase {
  public contentObservable$: Observable<TStartStopOperation>;

  public start(operation: TStartStopOperation): Promise<void> {
    return this.restService.put(this.resourceName + `/start`, operation);
  }

  public stop(operation: TStartStopOperation): Promise<void> {
    return this.restService.put(this.resourceName + `/stop`, operation);
  }

  constructor(
    protected resourceName: string,
    notificationService: NotificationService,
    protected logger: LoggerService,
    protected restService: RestService
  ) {
    super(resourceName, notificationService, logger, restService);
    this.contentObservable$ = this.getObservableSingle() as Observable<TStartStopOperation>;
  }
}
