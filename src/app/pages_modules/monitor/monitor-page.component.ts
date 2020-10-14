import { Component, OnInit, Input } from '@angular/core';
import { WizardTitleState, HpModalHostService } from 'hp-ui-elements';

@Component({
  selector: 'monitor-page',
  templateUrl: './monitor-page.component.html',
  styleUrls: ['./monitor-page.component.scss']
})
export class MonitorPageComponent implements OnInit {
  @Input() isSplittedScreen = false;
  headerStates = WizardTitleState;
  isShowWizard = false;
  bodyText: string;

  constructor(private modalService: HpModalHostService) {}

  ngOnInit() {}

  toggleWizard() {
    this.isShowWizard = !this.isShowWizard;
  }
}
