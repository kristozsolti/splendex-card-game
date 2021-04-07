import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeckSizeService } from '../deck-size.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  deckSize: number;
  deckSizeSub: Subscription;

  constructor(private deckSizeService: DeckSizeService) { }

  ngOnInit(): void {
    this.deckSizeSub = this.deckSizeService.sharedDeckSize.subscribe({
      next: (deckSize) => { this.deckSize = deckSize; }
    });
  }

  ngOnDestroy(): void {
    this.deckSizeSub.unsubscribe();
  }

}
