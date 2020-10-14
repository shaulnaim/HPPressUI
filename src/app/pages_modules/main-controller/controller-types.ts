export enum MenusButtonPressCssClass {
  ReadyPressed = '-ready-pressed',
  StandbyPressed = '-standby-pressed',
  OffPressed = '-off-pressed',
  ShutdownPressed = '-shutdown-pressed',
  RestartPressed = '-restart-pressed',
  ServicePressed = '-service-pressed'
}

export enum ControllerActionStates {
  startPrint = 'startPrint',
  stopPrint = 'stopPrint',
  pausePrint = 'pausePrint',
  getReady = 'getReady',
  goToOff = 'goToOff',
  goToStandby = 'goToStandby',
  goToService = 'goToService',
  shutdown = 'shutdown',
  restart = 'restart',
  offToStandby = 'offToStandby'
}

export enum slideAnimationTypes {
  DownUp = 'DownUp',
  DiagonalUpDownRight = 'DiagonalUpDownRight'
}
