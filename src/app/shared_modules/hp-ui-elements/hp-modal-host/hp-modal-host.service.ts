import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/* modal service manages the communication that's required between page components and modal components.
 It maintains a list of available modals on the page and exposes methods for interacting with those modals. */
export class HpModalHostService {
  private modals = [];

  add(modal) {
    this.modals.push(modal);
  }

  remove(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.open();
  }

  // close modal specified by id
  close(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }
}
