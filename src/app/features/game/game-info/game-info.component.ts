import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Input } from '@angular/core';
import { Game } from '../../../shared/models/game.model';
import { Firestore } from '@angular/fire/firestore';

/**
 * A component that displays the title and description of the current game card.
 * 
 * The card content is determined by parsing the card input string and mapping it
 * to a predefined list of actions with titles and descriptions.
 * 
 * Uses OnPush change detection strategy for performance optimization.
 *
 * @component
 */
@Component({
  selector: 'app-game-info',
  imports: [CommonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.sass'
})
export class GameInfoComponent implements OnChanges {
  /**
   * List of predefined card actions with titles and descriptions for the drinking game.
   */
  cardAction = [
    {
      title: 'Waterfall',
      description: 'Everyone starts drinking at the same time. You may only stop once the person before you stops.'
    },
    {
      title: 'You',
      description: 'You choose someone to take a drink.'
    },
    {
      title: 'Me',
      description: 'Congrats! You drink.'
    },
    {
      title: 'Category',
      description: 'Pick a category (e.g., brands of beer). Each player must name something in the category. First to fail drinks.'
    },
    {
      title: 'Bust a jive',
      description: 'Start a dance move. The next player repeats it and adds one. Repeat until someone messes up — they drink.'
    },
    {
      title: 'Chicks',
      description: 'All women drink.'
    },
    {
      title: 'Heaven',
      description: 'Everyone must raise their hands. Last one to do so drinks.'
    },
    {
      title: 'Mate',
      description: 'Pick a mate. Your mate must drink whenever you drink, and vice versa.'
    },
    {
      title: 'Thumbmaster',
      description: 'You can place your thumb on the table at any time. Last person to copy you drinks.'
    },
    {
      title: 'Men',
      description: 'All men drink.'
    },
    {
      title: 'Quizmaster',
      description: 'You are the Quizmaster. Anyone who answers your questions must drink.'
    },
    {
      title: 'Never have I ever...',
      description: 'Say something you’ve never done. Everyone who has done it must drink.'
    },
    {
      title: 'Rule',
      description: 'Make a rule (e.g., no using first names). Anyone who breaks it drinks until the end of the game.'
    }
  ];

  /**
   * Title of the current card, derived from the selected card.
   */
  title: string = '';

  /**
   * Description of the current card, derived from the selected card.
   */
  description: string = '';

  /**
   * The filename or identifier of the selected card (e.g., 'card_5.png').
   * Triggers card info update when changed.
   */
  @Input() card: string | null = null;

  /**
   * The current game state object.
   */
  @Input() game!: Game;

  /**
   * Injects the Firestore instance for backend operations (e.g., logging, saving progress).
   * 
   * @param firestore - The Firestore service.
   */
  constructor(private firestore: Firestore) {}

  /**
   * Lifecycle hook that runs when component input properties change.
   * If the card input changes, it updates the card title and description.
   *
   * @param changes - The changed input properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && this.card) {
      this.updateCardInfo();
    }
  }

  /**
   * Updates the displayed title and description based on the current card input.
   * Parses the card filename to extract the card number, which is used to index into the cardAction array.
   * Includes a short delay to wait for animation or DOM update.
   */
  updateCardInfo(): void {
    setTimeout(() => {
      const rawCard = this.card!.split('_')[1];
      const cardNumber = parseInt(rawCard.split('.')[0], 10);
      this.title = this.cardAction[cardNumber - 1]?.title ?? '';
      this.description = this.cardAction[cardNumber - 1]?.description ?? '';
    }, 500);
  }
}

