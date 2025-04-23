import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../services/firestore.service';

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-game-over.component.html',
  styleUrls: ['./dialog-game-over.component.sass']
})
export class GameOverComponent {
  @Output() restartGame = new EventEmitter<void>();
  @Input()gameOver!: boolean;

  constructor(public firestoreService: FirestoreService) {}

  onRestart(): void {
    this.restartGame.emit();
  }
}
