import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../shared/models/game.model';
import { PlayerBarComponent } from './player-bar/player-bar.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerBarComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.sass'
})
export class GameComponent {
  pickCardAnimation: boolean = false;
  pickedCard: string | null = null;
  showPickedCard: boolean = false;
  game: Game;

  constructor() {
    this.game = new Game();
  }

  takeCard() {
    if (this.pickCardAnimation) return;
    this.pickCardAnimation = true;
    this.pickedCard = this.game.deck.pop() || null;
    this.takeCardAnimation();
  }

  takeCardAnimation() {
    setTimeout(() => {
      this.showPickedCard = true;
      this.takeCardAnimationEnd();
    }, 500);
  }

  takeCardAnimationEnd() {
    setTimeout(() => {
      if (this.pickedCard) this.game.playedCards.push(this.pickedCard);
      this.pickCardAnimation = false;
      this.showPickedCard = false;
    }, 1000);
  }

  


}
