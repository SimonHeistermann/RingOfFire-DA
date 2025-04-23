import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Game } from '../../shared/models/game.model';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.sass'
})
export class StartScreenComponent {
  game: Game = new Game();
  imagePaths = [
    'img/flames_background.png',
    'img/game_background.png',
    'img/start_box_mobile.png',
    'img/start_box.png',
    'img/profile/actor_profile.png',
    'img/profile/alien_profile.png',
    'img/profile/comic_guy_profile.png',
    'img/profile/men_profile.png',
    'img/profile/kitten_profile.png',
    'img/profile/woman_profile.png',
    'img/cards/card_cover.png',
  ];

  constructor(private router: Router, private firestoreService: FirestoreService, private firestore: Firestore) {}

  async newGame() {
    try {
      this.firestoreService.game = this.game;
      const docRef = await this.firestoreService.addGame(this.game);
      this.router.navigate(['/game', docRef.id]);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }

  preloadImages(): void {
    this.imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }
  
}
