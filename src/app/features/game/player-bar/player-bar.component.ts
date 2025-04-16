import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Game } from '../../../shared/models/game.model';

@Component({
  selector: 'app-player-bar',
  imports: [CommonModule],
  templateUrl: './player-bar.component.html',
  styleUrl: './player-bar.component.sass'
})
export class PlayerBarComponent {
  @Input()  game!: Game;
}
