import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, Injectable, OnDestroy } from '@angular/core';
import { Game } from './../shared/models/game.model';
import { PlayerBarComponent } from './../features/game/player-bar/player-bar.component';
import { GameInfoComponent } from './../features/game/game-info/game-info.component';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy, limit, where, DocumentReference } from '@angular/fire/firestore';
import { list } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { doc as docRefDirect } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  game!: Game;

  constructor(private firestore: Firestore) { }

  subGame(gameId: string) {
    const gameDocRef = this.getSingleDocRef<Game>('games', gameId);
    return onSnapshot(gameDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.game = Object.assign(new Game(), data);
      } else {
        console.warn('No such game!');
      }
    });
  }

  async addGame(game: Game) {
    const gamesRef = this.getGamesRef();
    try {
      const docRef = await addDoc(gamesRef, this.getCleanJSON(game));
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }

  private getCleanJSON(game: Game): {} {
    const cleanJSON = {
      players: game.players,
      deck: game.deck,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer,
      pickCardAnimation: game.pickCardAnimation,
      pickedCard: game.pickedCard,
      showPickedCard: game.showPickedCard,
    };
    return cleanJSON;
  }

  getGamesRef() {
    const gamesRef = collection(this.firestore, 'games');
    return gamesRef;
  }

  getSingleDocRef<T = any>(colId: string, docId: string): DocumentReference<T> {
    return doc(this.firestore, `${colId}/${docId}`) as DocumentReference<T>;
  }

  async updateGame(game: Game, gameId: string) {
    if (!gameId) return;
    try {
      const collId = "games";
      const docRef = this.getSingleDocRef(collId, gameId);
      await updateDoc(docRef, this.getCleanJSON(game));
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  }
  
}
