import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  deckSize = 6;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startGame(deckSize: number): void {
    this.router.navigate(['/game']);
  }

  setDeckSize(deckSize: number): void {
    this.deckSize = deckSize;
  }

}
