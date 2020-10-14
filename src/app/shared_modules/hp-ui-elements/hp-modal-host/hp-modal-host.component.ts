import { Component, OnInit, OnDestroy, Input, ElementRef, EventEmitter, Output, AfterViewInit, ViewChild } from '@angular/core';
import { HpModalHostService } from './hp-modal-host.service';

@Component({
  selector: 'hp-modal-host',
  templateUrl: './hp-modal-host.component.html',
  styleUrls: ['./hp-modal-host.component.scss']
})
export class HpModalHostComponent implements OnInit, OnDestroy, AfterViewInit {
  textLines: string[];
  @ViewChild('HpModalContainer') hpModalContainer: ElementRef;
  @Output() leftBtnClick = new EventEmitter();
  @Output() rightBtnClick = new EventEmitter();

  @Input() id: string;
  @Input() width = 476;
  @Input() height = 363;
  @Input() screenPosition: string;
  @Input() modalTitle: string;
  @Input() leftBtnTxt: string;
  @Input() rightBtnTxt: string;
  @Input() set innerContent(text: string) {
    this.textLines = text.split('\n');
  }

  constructor(private modalService: HpModalHostService, private hostElement: ElementRef) {}
  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    document.body.appendChild(this.hostElement.nativeElement);

    // to close modal on backdrop click
    this.hostElement.nativeElement.addEventListener('click', (event: MouseEvent) => {
      if ((event.target as Element).className === 'hp-modal-backdrop') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.hostElement.nativeElement.remove();
  }

  ngAfterViewInit() {
    this.hpModalContainer.nativeElement.style.width = `${this.width}rem`;
    this.hpModalContainer.nativeElement.style.height = `${this.height}rem`;
  }

  open(): void {
    this.hostElement.nativeElement.style.display = 'grid';
    document.body.classList.add('hp-modal-open');
  }

  close(): void {
    this.hostElement.nativeElement.style.display = 'none';
    document.body.classList.remove('hp-modal-open');
  }

  rightBtnWasClicked(): void {
    this.close();
    this.rightBtnClick.emit();
  }

  leftBtnWasClicked(): void {
    this.leftBtnClick.emit();
  }
}
