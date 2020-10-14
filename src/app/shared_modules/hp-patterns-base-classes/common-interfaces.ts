import { uuid } from 'uuid';
/* tslint:disable:no-empty-interface */
export interface IServerMessageContent {}

export class ServerMessage {
  Type: ServerMessageTypes;
  ResourceUri: string;
  SubscriptionId: uuid;
  Content: IServerMessageContent;
}

export class ResourceNotificationMany<TPattern extends IKeyableData<TKey>, TKey> implements IServerMessageContent {
  NotificationType: DataNotificationsTypes;
  Data: TPattern[];
}

export class ResourceNotification<TPattern> implements IServerMessageContent {
  NotificationType: DataNotificationsTypes;
  Data: TPattern;
}

export class ClientConnected implements IServerMessageContent {
  ClientID: string;
}

export interface IContent {}

export enum ServerMessageTypes {
  ResourceNotification = 0,
  Connect = 1
}

export enum DataNotificationsTypes {
  Initial = 'Initial',
  Changed = 'Changed',
  Added = 'Added',
  Deleted = 'Deleted'
}

export interface IKeyableData<TKey> {
  Key: any;
}

export interface IAddable<TEntity extends IKeyableData<TKey>, TKey> {
  add(entity: TEntity): Promise<TEntity>;
}

export interface IUpdatable<TEntity, TKey> {
  update(entity: TEntity);
}

export interface IDeletable<TKey> {
  delete(Key: TKey);
}

export class StartStopOperationBase implements IContent {
  public Errors: IPressMessage[];
  public StartAvailability: Availability;
  public StopAvailability: Availability;
  public State: OperationStates;
}

export class CommandBase implements IContent {
  public Availability: Availability;
}

export enum OperationStates {
  Idle = 'Idle',
  InProgress = 'InProgress',
  Interrupted = 'Interrupted',
  Failed = 'Failed',
  Succeeded = 'Succeeded'
}

export interface IPressMessage {
  PressMessageID: PressMessageID;
}

export class PressMessageID {
  public Code: string;
  public Origin: string;
}

export class Availability {
  public IsAvailable: boolean;
  public UnavailableReasons: IPressMessage[];
}
