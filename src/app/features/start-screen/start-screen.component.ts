import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Game } from '../../shared/models/game.model';

@Component({
  selector: 'app-start-screen',
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.sass'
})
export class StartScreenComponent {
  game: Game = new Game();

  constructor(private router: Router, private firestoreService: FirestoreService) { 

  }

  async newGame() {
    try {
      this.firestoreService.game = this.game;
      const docRef = await this.firestoreService.addGame(this.game);
      this.router.navigate(['/game', docRef.id]);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  }
  
}
