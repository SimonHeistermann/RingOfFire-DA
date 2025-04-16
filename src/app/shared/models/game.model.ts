import { Player } from '../../shared/models/player.model';


export class Game {
    public players: Player[]  = [
        { id: 1, name: 'Max', profileImage: 'img/profile/1.webp', isActive: true },
        { id: 2, name: 'Anna', profileImage: 'img/profile/2.png', isActive: false },
        { id: 3, name: 'Tom', profileImage: 'img/profile/monkey.png', isActive: false },
    ];
    public deck: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;

    constructor() {
        this.deck = this.generateDeck();
    }

    generateDeck() {
        const suits = ['spade', 'hearts', 'diamonds', 'clubs'];
        const deck: string[] = [];
        for (const suit of suits) {
            for (let i = 1; i <= 13; i++) {
                deck.push(`${suit}_${i}.png`);
            }
        }
        return this.shuffle(deck);
    }

    shuffle(array: string[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}