import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.sass'
})
export class StartScreenComponent {

  constructor(private router: Router) { 

  }

  newGame() {
    this.router.navigate(['/game']);
    
  }
}
