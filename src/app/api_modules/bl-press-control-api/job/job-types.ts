import { IKeyableData } from 'hp-patterns-base-classes';
import { SubstrateEntityKey } from 'paper-handling-api';

export class JobEntity implements IKeyableData<JobEntityKey> {
  Key: JobEntityKey;
  JobDetails: JobDetails;
  Substrate: SubstrateEntityKey;
}

export class JobEntityKey {
  ID: number;
  constructor() {
    this.ID = 1;
  }
}

export class JobDetails {
  Name: string;
  Length: number;
  constructor() {
    this.Name = 'defaultJobName';
    this.Length = 200;
  }
}
