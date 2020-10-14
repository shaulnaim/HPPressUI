import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'inline-edit-input',
  templateUrl: './inline-edit-input.component.html',
  styleUrls: ['./inline-edit-input.component.scss'],
})
export class InlineEditInputComponent {
  editMode = false;
  @Input() isFocused = false;
  @Input() iconSrcPath: string;
  @Input() inputModel: string;
  @Output() inputModelChange = new EventEmitter<void>();
  EnterClicked = new EventEmitter<boolean>();
  onBlur = new EventEmitter<void>();
  constructor() {}
}
