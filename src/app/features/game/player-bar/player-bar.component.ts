import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Game } from '../../../shared/models/game.model';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule } from '@angular/material/dialog';
import { Player } from '../../../shared/models/player.model';
import { FirestoreService } from '../../../services/firestore.service';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy, limit, where, DocumentReference } from '@angular/fire/firestore';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

/**
 * A component that manages and displays player-related actions in the game.
 * 
 * Provides UI and logic for adding, editing, and removing players,
 * as well as assigning unique profile images and managing active players.
 *
 * @component
 */
@Component({
  selector: 'app-player-bar',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule
  ],
  templateUrl: './player-bar.component.html',
  styleUrl: './player-bar.component.sass'
})
export class PlayerBarComponent {
  /**
   * The current game object including player data and state.
   */
  @Input() game!: Game;

  /**
   * The ID of the current game, used for database updates.
   */
  @Input() gameId!: string;

  /**
   * Instance of MatDialog used to open dialogs.
   */
  readonly dialog = inject(MatDialog);

  /**
   * A list of available profile images to be randomly assigned to players.
   */
  allProfileImages = [
    'img/profile/actor_profile.png',
    'img/profile/alien_profile.png',
    'img/profile/comic_guy_profile.png',
    'img/profile/men_profile.png',
    'img/profile/kitten_profile.png',
    'img/profile/woman_profile.png',
  ];

  /**
   * Timeout handler for delayed click detection (used to debounce editPlayer calls).
   */
  clickTimeout: any = null;

  /**
   * Constructs the component and injects required services.
   * 
   * @param firestoreService - Custom service for updating game state in Firestore.
   * @param firestore - Firestore instance for potential direct operations.
   */
  constructor(private firestoreService: FirestoreService, private firestore: Firestore) {}

  /**
   * Opens a dialog to add a new player if the player limit (10) is not reached.
   * Adds the player to the game if the dialog returns a valid name.
   */
  openDialog(): void {
    if (this.game.players.length >= 10) return;
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null && result !== '') {
        this.addPlayer(result);
      }
    });
  }

  /**
   * Delays execution of player editing to avoid accidental double-triggering.
   * 
   * @param playerId - ID of the player to edit.
   */
  editPlayerSafely(playerId: number): void {
    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    }
    this.clickTimeout = setTimeout(() => {
      this.editPlayer(playerId);
      this.clickTimeout = null;
    }, 250);
  }

  /**
   * Opens the edit dialog for the specified player if found.
   *
   * @param playerId - ID of the player to edit.
   */
  editPlayer(playerId: number): void {
    const player = this.game.players.find(p => p.id === playerId);
    if (player) {
      this.openEditPlayerDialog(player);
    }
  }

  /**
   * Opens the edit dialog and updates the player's name and image if changes are made.
   *
   * @param player - The player to edit.
   */
  openEditPlayerDialog(player: Player): void {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent, {
      data: player
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        player.name = result.name;
        player.profileImage = result.profileImage;
        this.firestoreService.updateGame(this.game, this.gameId);
      }
    });
  }

  /**
   * Adds a new player to the game with a name and assigned profile image.
   *
   * @param name - The name of the player to add.
   */
  addPlayer(name: string): void {
    if (this.game.players.length >= 10) return;
    const newPlayer = this.createPlayerFromName(name);
    this.game.players.push(newPlayer);
    this.firestoreService.updateGame(this.game, this.gameId);
  }

  /**
   * Creates a new player object from the provided name.
   *
   * @param name - Name of the player.
   * @returns The created Player object.
   */
  private createPlayerFromName(name: string): Player {
    return {
      id: this.generateNextPlayerId(),
      name: name,
      profileImage: this.getRandomAvailableProfileImage(),
      isActive: this.shouldBeActive()
    };
  }

  /**
   * Returns a random profile image that hasn’t already been used by another player.
   *
   * @returns A profile image path.
   */
  private getRandomAvailableProfileImage(): string {
    const usedImages = this.game.players.map(player => player.profileImage);
    const availableImages = this.allProfileImages.filter(img => !usedImages.includes(img));
    const sourcePool = availableImages.length > 0 ? availableImages : this.allProfileImages;
    const randomIndex = Math.floor(Math.random() * sourcePool.length);
    return sourcePool[randomIndex];
  }

  /**
   * Generates the next unique player ID based on existing players.
   *
   * @returns A unique player ID.
   */
  private generateNextPlayerId(): number {
    if (this.game.players.length === 0) {
      return 1;
    }
    return Math.max(...this.game.players.map(p => p.id ?? 0)) + 1;
  }

  /**
   * Determines if the new player should be set as active.
   * The first player is always set to active.
   *
   * @returns True if the new player should be active, false otherwise.
   */
  private shouldBeActive(): boolean {
    return this.game.players.length === 0;
  }

  /**
   * Removes the specified player from the game.
   * If the removed player was active, the next player becomes active.
   *
   * @param playerToRemove - The player to remove.
   */
  removePlayer(playerToRemove: Player): void {
    const wasActive = playerToRemove.isActive;
    this.game.players = this.game.players.filter(player => player !== playerToRemove);
    if (wasActive && this.game.players.length > 0) {
      this.nextPlayer();
    }
    this.firestoreService.updateGame(this.game, this.gameId);
  }

  /**
   * Advances the active player index and updates the active state.
   */
  nextPlayer(): void {
    this.firestoreService.game.currentPlayer =
      (this.firestoreService.game.currentPlayer + 1) % this.firestoreService.game.players.length;
    this.firestoreService.game.updateActivePlayer();
  }
}

