import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeckSizeService } from '../deck-size.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  deckSize = 6;

  constructor(private router: Router,
              private deckSizeService: DeckSizeService) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.router.navigate(['/game']);
  }

  setDeckSize(deckSize: number): void {
    this.deckSize = deckSize;
    this.deckSizeService.setDeckSize(deckSize);
  }

}
