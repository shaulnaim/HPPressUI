import { Observable } from 'rxjs';
import { NotificationService, LoggerService, RestService } from 'hp-services';
import { PatternServiceBase } from './pattern-service-base';

export abstract class EntityServiceBase<TEntity> extends PatternServiceBase<TEntity> {
  constructor(
    resourceName: string,
    notificationService: NotificationService,
    logger: LoggerService,
    restService: RestService
  ) {
    super(resourceName, notificationService, logger, restService);
  }

  update(entity: TEntity): Promise<TEntity> {
    return super.callServer('update', entity);
  }
}
