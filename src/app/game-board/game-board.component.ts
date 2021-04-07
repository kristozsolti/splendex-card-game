import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CardData } from '../card/card-data';
import { DeckSizeService } from '../deck-size.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  deckSize: number;
  deckSizeSub: Subscription;
  cardImages = [
    'angular.png',
    'd3.png',
    'jenkins.png',
    'postcss.png',
    'react.png',
    'redux.png',
    'sass.png',
    'splendex.png',
    'ts.png',
    'webpack.png',
  ];

  cards: CardData[] = [];
  flippedCards: CardData[] = [];

  matchedCount = 0;

  constructor(private deckSizeService: DeckSizeService) { }

  ngOnInit(): void {
    this.deckSizeSub = this.deckSizeService.sharedDeckSize.subscribe({
      next: (deckSize) => { this.deckSize = deckSize; }
    });

    this.setupCards();
  }

  ngOnDestroy(): void {
    this.deckSizeSub.unsubscribe();
  }

  setupCards(): void {
    this.cardImages = this.cardImages.slice(0, this.deckSize);
    this.cards = [];
    this.cardImages.forEach((image) => {
      const cardData: CardData = {
        imageId: image,
        state: 'default'
      };

      this.cards.push({ ...cardData });
      this.cards.push({ ...cardData });

    });

    this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(anArray: any[]): any[] {
    return anArray.map(a => [Math.random(), a])
      .sort((a, b) => a[0] - b[0])
      .map(a => a[1]);
  }

  cardClicked(index: number): void {
    const cardInfo = this.cards[index];

    if (cardInfo.state === 'default' && this.flippedCards.length < 2)
    {
      cardInfo.state = 'flipped';
      this.flippedCards.push(cardInfo);

      if (this.flippedCards.length === 2) {
        this.checkForCardMatch();
     }

    } else if (cardInfo.state === 'flipped') {
      cardInfo.state = 'default';
      this.flippedCards.pop();

    }
  }

  checkForCardMatch(): void {
    setTimeout(() => {
      const cardOne = this.flippedCards[0];
      const cardTwo = this.flippedCards[1];
      const nextState = cardOne.imageId === cardTwo.imageId ? 'matched' : 'default';
      cardOne.state = cardTwo.state = nextState;

      this.flippedCards = [];

      if (nextState === 'matched') {
        this.matchedCount++;

        if (this.matchedCount === this.cardImages.length) {
          const restart = confirm('You Won! Would you like to restart?');

          if (restart) {
            this.restart();
          }
        }
      }

    }, 1000);
  }

  restart(): void {
    this.matchedCount = 0;
    this.setupCards();
  }

}
