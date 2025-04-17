import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../../shared/models/game.model';
import { PlayerBarComponent } from './player-bar/player-bar.component';
import { GameInfoComponent } from './game-info/game-info.component';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerBarComponent, GameInfoComponent],
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
    if (this.pickCardAnimation || this.game.players.length <= 0) return;
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
      this.nextPlayer();
      this.pickCardAnimation = false;
      this.showPickedCard = false;
    }, 1000);
  }

  nextPlayer() {
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
    this.game.updateActivePlayer();
  }

  


}
