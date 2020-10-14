import { StartStopOperationBase } from './common-interfaces';
import { StartStopOperationServiceBase } from './start-stop-operation-service-base';
import { PatternModelBase } from './pattern-model-bases';
import { LoggerService } from 'hp-services';

export abstract class StartStopOperationModelBase<TStartStopOperation extends StartStopOperationBase>
extends PatternModelBase<TStartStopOperation> {
    constructor(protected service: StartStopOperationServiceBase<TStartStopOperation>, protected logger: LoggerService) {
        super(service, logger);
    }

    public start(operation: TStartStopOperation): Promise<void> {
        return this.service.start(operation);
    }

    public stop(operation: TStartStopOperation): Promise<void> {
        return this.service.stop(operation);
    }
}
