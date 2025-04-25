import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../../services/firestore.service';

/**
 * A standalone component representing the "Game Over" dialog or screen.
 * 
 * Displays a message or UI element when the game is over and provides an option to restart the game.
 *
 * @component
 */
@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog-game-over.component.html',
  styleUrls: ['./dialog-game-over.component.sass']
})
export class GameOverComponent {
  /**
   * Emits an event when the user chooses to restart the game.
   */
  @Output() restartGame = new EventEmitter<void>();

  /**
   * A boolean indicating whether the game is currently over.
   * Used to conditionally display the game over UI.
   */
  @Input() gameOver!: boolean;

  /**
   * Injects the FirestoreService for potential backend operations (e.g. score saving).
   *
   * @param firestoreService - Service for interacting with Firestore.
   */
  constructor(public firestoreService: FirestoreService) {}

  /**
   * Emits the `restartGame` event to notify the parent component that a game restart was requested.
   */
  onRestart(): void {
    this.restartGame.emit();
  }
}

