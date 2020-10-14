import { StartStopOperationBase, IPressMessage, Availability, OperationStates } from 'hp-patterns-base-classes';

export class CalibrationOperationBase extends StartStopOperationBase {
  public CalibrationState: CalibrationState;
  public CalcResult: CalibrationResult;
  public CalibrationResult: CalibrationResult;
  public CommitState: OperationStates;
  public CommitAvailability: Availability;
  public CancelState: OperationStates;
  public CancelAvailability: Availability;
  public CalibrationId: string;
  public ScopeId: string;
}

export enum CalibrationState {
  NotStarted = 'NotStarted',
  OperationInProgress = 'OperationInProgress',
  OperationCompleted = 'OperationCompleted',
  CommitInProgress = 'CommitInProgress',
  CancelInProgress = 'CancelInProgress',
  Completed = 'Completed'
}

export enum CalibrationStatus {
  None = 'None',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
  SucceededWithWarning = 'SucceededWithWarning',
  DidNotConverge = 'DidNotConverge'
}

export class CalibrationResult {
  public Status: CalibrationStatus;
  public ResultMessages: IPressMessage[];
}


