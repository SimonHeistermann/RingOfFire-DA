import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * The root component of the application.
 * 
 * This component serves as the entry point to the Angular application and holds the main structure. 
 * It is responsible for rendering the initial template and includes the `RouterOutlet` for routing.
 * 
 * @component
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  /**
   * The title of the application.
   * 
   * This value is typically displayed in the app's header or other UI components.
   * 
   * @type {string}
   */
  title = 'ringoffire';
}

