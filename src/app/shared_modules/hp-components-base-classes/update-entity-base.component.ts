import {
  AfterViewInit,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { IKeyableData, IUpdatable } from 'hp-patterns-base-classes';
import { InlineEditInputComponent } from 'hp-ui-elements';

export abstract class UpdateEntityBaseComponent<
  TModel extends IUpdatable<TEntity, TKey>,
  TEntity extends IKeyableData<TKey>,
  TKey
> implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @ViewChildren(forwardRef(() => InlineEditInputComponent)) inlineEditInputs: QueryList<
    InlineEditInputComponent
  >;
  @Input() entity: TEntity;
  @Input() editMode = false;
  @Output() EnterClicked = new EventEmitter<boolean>();

  keepUpdatingFields = true;
  isEntityChanged = false;
  editableEntity: TEntity;
  entityModel: TModel;
  onBlurSubscription: Subscription;
  onEnterSubscription: Subscription;

  constructor(model: TModel) {
    this.entityModel = model;
  }

  handleStream(isStreamed: boolean) {
    this.keepUpdatingFields = isStreamed;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.entity && this.keepUpdatingFields) {
      this.editableEntity = _.cloneDeep(changes.entity.currentValue);
    }
    if (changes.editMode) {
      this.updateChildrenEditMode();
    }
    if (changes.editMode?.currentValue === true) {
      this.freezeSocketStream();
    }
    if (changes.editMode?.currentValue === false) {
      this.restoreSocketStream();
    }
  }

  ngOnInit() {}

  stringifyObjectValues(obj: object) {
    return JSON.parse(JSON.stringify(obj, (k, v) => (v && typeof v === 'object' ? v : '' + v)));
  }

  ngAfterViewInit() {
    this.inlineEditInputs.forEach((input) => {
      this.onEnterSubscription = input.EnterClicked.subscribe({
        next: (value: boolean) => {
          this.EnterClicked.emit(value);
        }
      });
      this.onBlurSubscription = input.onBlur.subscribe({
        next: () => {
          if (
            !_.isEqual(
              this.stringifyObjectValues(this.entity),
              this.stringifyObjectValues(this.editableEntity)
            )
          ) {
            this.entity = _.cloneDeep(this.editableEntity);
            this.triggerModelUpdate(this.editableEntity);
          }
        }
      });
    });
  }

  updateChildrenEditMode() {
    if (this.inlineEditInputs) {
      this.inlineEditInputs.forEach((input) => {
        input.editMode = this.editMode;
      });
    }
  }

  ngOnDestroy() {
    this.onBlurSubscription.unsubscribe();
    this.onEnterSubscription.unsubscribe();
  }

  async triggerModelUpdate(entity) {
    await this.entityModel.update(entity);
    this.restoreSocketStream();
  }

  restoreSocketStream() {
    this.handleStream(true);
  }

  freezeSocketStream() {
    this.handleStream(false);
  }
}
