import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Game } from '../../shared/models/game.model';
import { Firestore } from '@angular/fire/firestore';

/**
 * The component representing the game's start screen.
 * 
 * Initializes a new game instance, handles navigation to the game view,
 * and preloads required images on component initialization to improve performance.
 *
 * @component
 * @implements {OnInit}
 */
@Component({
  selector: 'app-start-screen',
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.sass'
})
export class StartScreenComponent implements OnInit {
  /**
   * The initial game object that will be stored in Firestore once the game starts.
   */
  game: Game = new Game();

  /**
   * Paths to all images that should be preloaded before starting the game.
   */
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

  /**
   * Creates the component and injects required services.
   * 
   * @param router - Angular Router for navigation.
   * @param firestoreService - Service to handle game data interactions.
   * @param firestore - Firestore instance for direct database access if needed.
   */
  constructor(
    private router: Router,
    private firestoreService: FirestoreService,
    private firestore: Firestore
  ) {}

  /**
   * Angular lifecycle hook that is called after component initialization.
   * Automatically preloads required images.
   */
  ngOnInit(): void {
    this.preloadImages();
  }

  /**
   * Creates a new game in Firestore and navigates to the game view.
   * Sets the shared game instance in the service before storing.
   */
  async newGame(): Promise<void> {
    try {
      this.firestoreService.game = this.game;
      const docRef = await this.firestoreService.addGame(this.game);
      this.router.navigate(['/game', docRef.id]);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }

  /**
   * Preloads all defined images to ensure smooth transitions and fast loading during gameplay.
   */
  preloadImages(): void {
    this.imagePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
    });
  }
}
