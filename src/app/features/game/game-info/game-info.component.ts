import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Input } from '@angular/core';
import { Game } from '../../../shared/models/game.model';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-game-info',
  imports: [CommonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.sass'
})
export class GameInfoComponent implements OnChanges {

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

  title: string = '';
  description: string = '';
  @Input()card: string | null = null;
  @Input()game!: Game;


  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    if (this.card) this.updateCardInfo();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && this.card) {
      this.updateCardInfo();
    }
  }
  
  updateCardInfo() {
    setTimeout(() => {
      const rawCard = this.card!.split('_')[1];
      const cardNumber = parseInt(rawCard.split('.')[0], 10);
      this.title = this.cardAction[cardNumber - 1]?.title ?? '';
      this.description = this.cardAction[cardNumber - 1]?.description ?? '';
    }, 500);
  }
  
  
}
