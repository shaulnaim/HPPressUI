import { JobDetails, JobEntityKey } from 'press-control-api';
import { SubstrateEntityKey } from 'paper-handling-api';

export class PlannerSlotEntity {
  public Key: PlannerSlotEntityKey;
  public JobKey: JobEntityKey;
  public JobDetails: JobDetails;
  public SubstrateKey: SubstrateEntityKey;
  public SubstrateName: string;
  constructor() {
    this.Key = new PlannerSlotEntityKey();
    this.JobKey = new JobEntityKey();
    this.JobDetails = new JobDetails();
    this.SubstrateKey = new SubstrateEntityKey();
    this.SubstrateName = 'default';
  }
}

export class PlannerSlotEntityKey {
  ID: string;
  constructor() {
    this.ID = '1';
  }
}
