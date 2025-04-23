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

@Component({
  selector: 'app-player-bar',
  imports: [CommonModule, MatButtonModule, MatIconModule, 
    MatDividerModule, MatDialogModule
  ],
  templateUrl: './player-bar.component.html',
  styleUrl: './player-bar.component.sass'
})
export class PlayerBarComponent {
  @Input()  game!: Game;
  @Input() gameId!: string;
  readonly dialog = inject(MatDialog);
  allProfileImages = [
    'img/profile/actor_profile.png',
    'img/profile/alien_profile.png',
    'img/profile/comic_guy_profile.png',
    'img/profile/men_profile.png',
    'img/profile/kitten_profile.png',
    'img/profile/woman_profile.png',
  ];
  clickTimeout: any = null;

  constructor(private firestoreService: FirestoreService, private firestore: Firestore) {}

  openDialog(): void {
    if (this.game.players.length >= 10) return;
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== null && result !== '') {
        this.addPlayer(result);
      }
    });
  }


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

  editPlayer(playerId: number): void {
    const player = this.game.players.find(p => p.id === playerId);
    if (player) {
      this.openEditPlayerDialog(player);
    }
  }
  
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

  addPlayer(name: string): void {
    if (this.game.players.length >= 10) return;
    const newPlayer = this.createPlayerFromName(name);
    this.game.players.push(newPlayer);
    this.firestoreService.updateGame(this.game, this.gameId);
  }

  private createPlayerFromName(name: string): Player {
    return {
      id: this.generateNextPlayerId(),
      name: name,
      profileImage: this.getRandomAvailableProfileImage(),
      isActive: this.shouldBeActive()
    };
  }  

  private getRandomAvailableProfileImage(): string {
    const usedImages = this.game.players.map(player => player.profileImage);
    const availableImages = this.allProfileImages.filter(img => !usedImages.includes(img));
    const sourcePool = availableImages.length > 0 ? availableImages : this.allProfileImages;
    const randomIndex = Math.floor(Math.random() * sourcePool.length);
    return sourcePool[randomIndex];
  }

  private generateNextPlayerId(): number {
    if (this.game.players.length === 0) {
      return 1;
    }
    return Math.max(...this.game.players.map(p => p.id ?? 0)) + 1;
  }

  private shouldBeActive(): boolean {
    return this.game.players.length === 0;
  }

  removePlayer(playerToRemove: Player): void {
    const wasActive = playerToRemove.isActive;
    this.game.players = this.game.players.filter(player => player !== playerToRemove);
    if (wasActive && this.game.players.length > 0) {
      this.nextPlayer();
    }
    this.firestoreService.updateGame(this.game, this.gameId);
  }

  nextPlayer() {
    this.firestoreService.game.currentPlayer = (this.firestoreService.game.currentPlayer + 1) % this.firestoreService.game.players.length;
    this.firestoreService.game.updateActivePlayer();
  }
  

  
}
