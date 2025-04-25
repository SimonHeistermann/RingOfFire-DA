import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, Injectable, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Game } from '../../shared/models/game.model';
import { PlayerBarComponent } from './player-bar/player-bar.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy, limit, where, DocumentReference } from '@angular/fire/firestore';
import { list } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { doc as docRefDirect } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { GameOverComponent } from './dialog-game-over/dialog-game-over.component';

/**
 * The main component responsible for handling the game logic and flow.
 * 
 * Manages card drawing, turn rotation, game over state, and synchronizes with Firestore.
 * Also coordinates UI updates with the PlayerBar, GameInfo, and GameOver components.
 * 
 * @component
 */
@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerBarComponent, GameInfoComponent, GameOverComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.sass'
})
export class GameComponent implements OnDestroy {
  /**
   * The current game instance, shared across components and services.
   */
  game: Game = new Game();

  /**
   * Unique game ID used to subscribe to the correct Firestore document.
   */
  gameId: string = '';

  /**
   * Unsubscribe function for the Firestore game subscription.
   */
  unsubGame!: () => void;

  /**
   * Reference to the global window object (used in templates if needed).
   */
  window = window;

  /**
   * Indicates whether the game has ended.
   */
  gameOver: boolean = false;

  /**
   * Creates the component and initializes game subscription from route params.
   *
   * @param route - ActivatedRoute for reading route parameters.
   * @param firestoreService - Custom Firestore service managing game data.
   * @param firestore - Firestore instance for direct interactions (if needed).
   * @param cdr - ChangeDetectorRef for manual change detection (not used here directly).
   */
  constructor(
    private route: ActivatedRoute,
    public firestoreService: FirestoreService,
    private firestore: Firestore,
    private cdr: ChangeDetectorRef
  ) {
    this.firestoreService.game = this.game;
    this.route.params.subscribe(params => {
      if (params['id']) this.gameId = params['id'];
      this.unsubGame = this.firestoreService.subGame(this.gameId);
    });
  }

  /**
   * Lifecycle hook to clean up subscription on component destruction.
   */
  ngOnDestroy(): void {
    if (this.unsubGame) this.unsubGame();
  }

  /**
   * Initiates drawing a card from the deck.
   * Prevents action if an animation is running or no players exist.
   */
  takeCard(): void {
    if (this.firestoreService.game.pickCardAnimation || this.firestoreService.game.players.length <= 0) return;
    this.firestoreService.game.pickCardAnimation = true;
    this.takeCardFromDeck();

    if (!this.gameOver) {
      this.preloadNextCard();
      this.takeCardAnimation();
    }
  }

  /**
   * Preloads the next card image to reduce flickering when it appears.
   */
  preloadNextCard(): void {
    const img = new Image();
    img.src = 'img/cards/' + this.firestoreService.game.deck[this.firestoreService.game.deck.length - 1];
  }

  /**
   * Draws the top card from the deck and updates the game state.
   * Sets gameOver to true if the deck is empty.
   */
  takeCardFromDeck(): void {
    if (this.firestoreService.game.deck.length === 0) {
      this.gameOver = true;
      return;
    }
    this.firestoreService.game.pickedCard = this.firestoreService.game.deck.pop() || null;
    this.firestoreService.updateGame(this.firestoreService.game, this.gameId);
  }

  /**
   * Triggers the card animation delay and update.
   */
  takeCardAnimation(): void {
    setTimeout(() => {
      this.firestoreService.game.showPickedCard = true;
      this.firestoreService.updateGame(this.firestoreService.game, this.gameId);
      this.takeCardAnimationEnd();
    }, 500);
  }

  /**
   * Finishes the card animation, moves card to played pile,
   * advances to the next player, and resets flags.
   */
  takeCardAnimationEnd(): void {
    setTimeout(() => {
      if (this.firestoreService.game.pickedCard) {
        this.firestoreService.game.playedCards.push(this.firestoreService.game.pickedCard);
      }
      this.nextPlayer();
      this.firestoreService.game.pickCardAnimation = false;
      this.firestoreService.game.showPickedCard = false;
      this.firestoreService.updateGame(this.firestoreService.game, this.gameId);
    }, 1000);
  }

  /**
   * Advances the currentPlayer index and updates the active player.
   */
  nextPlayer(): void {
    this.firestoreService.game.currentPlayer =
      (this.firestoreService.game.currentPlayer + 1) % this.firestoreService.game.players.length;
    this.firestoreService.game.updateActivePlayer();
  }

  /**
   * Restarts the game by resetting all relevant game state fields.
   * Updates the Firestore document with the fresh state.
   */
  restartGame(): void {
    const game = this.firestoreService.game;
    this.resetGameState(game);
    this.gameOver = false;
    this.firestoreService.updateGame(game, this.gameId);
  }

  /**
   * Helper function to reset deck, played cards, animations, and player state.
   * 
   * @param game - The game instance to reset.
   */
  private resetGameState(game: Game): void {
    game.deck = game.generateDeck();
    game.playedCards = [];
    game.pickedCard = null;
    game.showPickedCard = false;
    game.pickCardAnimation = false;
    game.players.forEach(player => player.isActive = false);
    game.currentPlayer = 0;
    game.updateActivePlayer();
  }
}

