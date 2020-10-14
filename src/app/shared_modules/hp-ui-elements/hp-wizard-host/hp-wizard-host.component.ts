import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IlsCalibrationComponent } from 'app/pages_modules/monitor/components/ils-calibration/ils-calibration.component';
import { CalibrationStatus } from 'calibrations-api';
import { DestroyService } from 'hp-services';
import { takeUntil } from 'rxjs/operators';
import { HpModalHostService } from '../hp-modal-host/hp-modal-host.service';
import { ScreenPositionState, WizardTitleState } from '../hp-ui-elements-types';
import { HpWizardChildService } from './hp-wizard-child.service';

@Component({
  selector: 'hp-wizard-host',
  templateUrl: './hp-wizard-host.component.html',
  styleUrls: ['./hp-wizard-host.component.scss']
})
export class HpWizardHostComponent implements OnInit, AfterViewInit, AfterContentInit {
  destroy$: DestroyService;
  @Input() title = '';
  @Input() width = 544;
  @Input() height = 768;
  @Input() isWithMinimize = true;
  @Input() isBackVisible = true;
  @Input() isOkVisible = true;
  @Input() isCancelVisible = true;
  headerState: WizardTitleState;
  isOkAvailable = false;
  isCancelAvailable = true;
  isShowodal = false;

  @Output() isVisibleChange = new EventEmitter();

  _isVisible = true;
  get isVisible(): boolean {
    return this._isVisible;
  }
  @Input()
  set isVisible(val: boolean) {
    if (val) {
      this.hostElement.nativeElement.style.display = `grid`;
    } else {
      this.hostElement.nativeElement.style.display = `none`;
    }
    this._isVisible = val;
  }
  screenPosition = ScreenPositionState;
  modalTitle = 'cancel calibration'; // TODO: i18n
  modalInnerText = 'Calibration is not complete.\n Are you sure you want to cancel the calibration?'; // TODO: i18n
  modalLeftBtnTxt = 'continue'; // TODO: i18n
  modalRightBtnTxt = 'cancel'; // TODO: i18n

  constructor(
    private hostElement: ElementRef,
    private modalService: HpModalHostService,
    private hpWizardChildService: HpWizardChildService,
    destroy$: DestroyService
  ) {
    this.destroy$ = destroy$;
  }

  ngOnInit(): void {
    this.headerState = WizardTitleState.None;
  }

  ngAfterContentInit(): void {
    this.hpWizardChildService.wizardCommitBtnAvailability$.pipe(takeUntil(this.destroy$)).subscribe((commitBtnAvailability: boolean) => {
      this.isOkAvailable = commitBtnAvailability;
    });
    this.hpWizardChildService.wizardProcessStarted$.pipe(takeUntil(this.destroy$)).subscribe((processStarted) => {
      this.isShowodal = processStarted;
    });
    this.hpWizardChildService.wizardCancelBtnAvailability$.pipe(takeUntil(this.destroy$)).subscribe((cancelBtnAvailability: boolean) => {
      this.isCancelAvailable = cancelBtnAvailability;
    });
    this.hpWizardChildService.wizardHeaderState$.pipe(takeUntil(this.destroy$)).subscribe((headerState: CalibrationStatus) => {
      switch (headerState) {
        case CalibrationStatus.None:
          this.headerState = WizardTitleState.None;
          break;
        case CalibrationStatus.DidNotConverge:
        case CalibrationStatus.Failed:
          this.headerState = WizardTitleState.Failure;
          break;
        case CalibrationStatus.SucceededWithWarning:
        case CalibrationStatus.Succeeded:
          this.headerState = WizardTitleState.Success;
      }
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  ngAfterViewInit() {
    this.hostElement.nativeElement.style.width = `${this.width}rem`;
    this.hostElement.nativeElement.style.height = `${this.height}rem`;
  }

  onWizardCancelClick() {
    if (this.isShowodal) {
      this.openModal('cancel-calibration');
    } else {
      this.isVisibleChange.emit();
    }
  }

  onWizardOkClick() {
    this.hpWizardChildService.wizardOkBtnClicked = true;
  }

  onModalCancel() {
    this.hpWizardChildService.wizardCancelBtnClicked = true;
    this.closeModal('cancel-calibration');
    this.isVisibleChange.emit();
  }

  onModalContinue() {
    this.closeModal('cancel-calibration');
  }
}
