import { IPattern } from 'hp-patterns-base-classes';

// TODO:this Content should be auto generated in the future

export class MainPressControlEntity implements IPattern {
  public CurrentPressState: MainPressControlState;
  public IsPrintAvailable: boolean;
  public IsStopAvailable: boolean;
  public IsPauseAvailable: boolean;
  public IsRestartAvailable: boolean;
  public IsShutdownAvailable: boolean;
  public IsServiceAvailable: boolean;
  public IsGetReadyAvailable: boolean;
  public IsGoToStandbyAvailable: boolean;
  public IsGoToOffAvailable: boolean;
  public IsPowerEnableAvailable: boolean;
}
export enum MainPressControlState {
  Init = 'Init',
  PowerDisable = 'PowerDisable',
  Off = 'Off',
  Service = 'Service',
  Standby = 'Standby',
  StandbyToReady = 'StandbyToReady',
  Ready = 'Ready',
  PrePrint = 'PrePrint',
  Print = 'Print',
  PostPrint = 'PostPrint',
  Pause = 'Pause',
  Recovery = 'Recovery',
  ReadyToOff = 'ReadyToOff',
  StandbyToOff = 'StandbyToOff',
  GoToStandby = 'GoToStandby',
  GoToService = 'GoToService',
  OffToReady = 'OffToReady',
  OffToStandby = 'OffToStandby',
  OffReadyToStandby = 'OffReadyToStandby',
  OffStandbyToReady = 'OffStandbyToReady',
  ServiceToStandby = 'ServiceToStandby',
  ServiceToOff = 'ServiceToOff',
  Error = 'Error'
}
