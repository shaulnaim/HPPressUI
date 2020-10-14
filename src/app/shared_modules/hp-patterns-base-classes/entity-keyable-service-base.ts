import { ServiceBase } from './service-base';
import { IKeyableData } from './common-interfaces';
import { NotificationService, LoggerService, RestService } from 'hp-services';

export abstract class EntityKeyableServiceBase<TEntity extends IKeyableData<TKey>, TKey> extends ServiceBase {
  constructor(
    protected resourceName: string,
    notificationService: NotificationService,
    protected logger: LoggerService,
    protected restService: RestService
  ) {
    super(resourceName, notificationService, logger, restService);
  }

  protected addInternal(entity: TEntity): Promise<TEntity> {
    return this.restService.put(this.resourceName + '/add', entity);
  }

  protected updateInternal(entity: TEntity): Promise<TEntity> {
    return this.restService.put(this.resourceName + '/update', entity);
  }

  protected deleteInternal(key: any) {
    return this.restService.put(this.resourceName + '/delete', key);
  }
}
