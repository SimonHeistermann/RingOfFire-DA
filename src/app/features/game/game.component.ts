import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../shared/models/game.model';
import { PlayerBarComponent } from './player-bar/player-bar.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy, limit, where, DocumentReference } from '@angular/fire/firestore';
import { list } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { doc as docRefDirect } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerBarComponent, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.sass'
})
export class GameComponent implements OnDestroy {
  game: Game = new Game();
  gameId: string = '';
  unsubGame!: () => void;
  window = window;

  constructor(private route: ActivatedRoute, public firestoreService: FirestoreService, private firestore: Firestore) {
    this.firestoreService.game = this.game;
    this.route.params.subscribe(params => { 
      if(params['id']) this.gameId = params['id'];
      this.unsubGame = this.firestoreService.subGame(this.gameId);
    });
  }

  ngOnDestroy(): void {
    if(this.unsubGame)
    this.unsubGame();
  }

  takeCard() {
    if (this.firestoreService.game.pickCardAnimation || this.firestoreService.game.players.length <= 0) return;
    this.firestoreService.game.pickCardAnimation = true;
    this.takeCardFromDeck();
    this.takeCardAnimation();
  }

  takeCardFromDeck() {
    const game = this.firestoreService.game;
    if (game.deck.length === 0) {
      game.deck = game.generateDeck();
      if (game.pickedCard) {
        game.playedCards = [game.pickedCard];
      } else {
        game.playedCards = [];
      }
    }
    game.pickedCard = game.deck.pop() || null;
    this.firestoreService.updateGame(game, this.gameId);
  }

  takeCardAnimation() {
    setTimeout(() => {
      this.firestoreService.game.showPickedCard = true;
      this.firestoreService.updateGame(this.firestoreService.game, this.gameId);
      this.takeCardAnimationEnd();
    }, 500);
  }

  takeCardAnimationEnd() {
    setTimeout(() => {
      if (this.firestoreService.game.pickedCard) this.firestoreService.game.playedCards.push(this.firestoreService.game.pickedCard);
      this.nextPlayer();
      this.firestoreService.game.pickCardAnimation = false;
      this.firestoreService.game.showPickedCard = false;
      this.firestoreService.updateGame(this.firestoreService.game, this.gameId);
    }, 1000);
  }

  nextPlayer() {
    this.firestoreService.game.currentPlayer = (this.firestoreService.game.currentPlayer + 1) % this.firestoreService.game.players.length;
    this.firestoreService.game.updateActivePlayer();
  }

  

  


}
