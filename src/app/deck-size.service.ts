import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckSizeService {
  private deckSize = new BehaviorSubject(6);
  sharedDeckSize = this.deckSize.asObservable();

  constructor() { }

  setDeckSize(deckSize: number): void {
    this.deckSize.next(deckSize);
  }
}
