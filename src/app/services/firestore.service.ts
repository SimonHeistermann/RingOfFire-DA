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

/**
 * Service to handle all interactions with Firestore for the game.
 * 
 * Provides methods to subscribe to a specific game's document, add a new game to Firestore, 
 * update an existing game, and retrieve clean JSON data for storing games.
 * 
 * @service
 */
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  /**
   * The current game instance being managed by this service.
   * 
   * @type {Game}
   */
  game!: Game;

  /**
   * Creates the service and injects the required Firestore dependency.
   * 
   * @param firestore - Firestore instance for database interactions.
   */
  constructor(private firestore: Firestore) { }

  /**
   * Subscribes to a specific game document in Firestore and updates the local game instance when the document changes.
   * 
   * @param gameId - The unique identifier of the game document to subscribe to.
   * @returns {Function} - A function to unsubscribe from the Firestore document updates.
   */
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

  /**
   * Adds a new game to Firestore under the "games" collection.
   * 
   * @param game - The game instance to be added to Firestore.
   * @returns {Promise<DocumentReference>} - A promise that resolves with the document reference of the newly added game.
   * @throws {Error} - If an error occurs while adding the document to Firestore.
   */
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

  /**
   * Converts a game instance to a clean JSON object for Firestore storage.
   * Excludes non-serializable properties (like methods) from the game instance.
   * 
   * @param game - The game instance to be converted into a clean JSON object.
   * @returns {Object} - A plain JavaScript object representing the game.
   */
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

  /**
   * Returns a reference to the Firestore "games" collection.
   * 
   * @returns {CollectionReference} - A reference to the Firestore "games" collection.
   */
  getGamesRef() {
    const gamesRef = collection(this.firestore, 'games');
    return gamesRef;
  }

  /**
   * Retrieves a reference to a single document in Firestore based on the collection and document IDs.
   * 
   * @param colId - The ID of the collection where the document is located.
   * @param docId - The ID of the document within the collection.
   * @returns {DocumentReference<T>} - A reference to the Firestore document.
   */
  getSingleDocRef<T = any>(colId: string, docId: string): DocumentReference<T> {
    return doc(this.firestore, `${colId}/${docId}`) as DocumentReference<T>;
  }

  /**
   * Updates an existing game document in Firestore with the latest game data.
   * 
   * @param game - The game instance containing the updated data.
   * @param gameId - The unique identifier of the game document to be updated.
   * @throws {Error} - If an error occurs while updating the document.
   */
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

