import { Player } from '../../shared/models/player.model';

/**
 * The class representing the game logic.
 * 
 * Manages the state of the game, including players, deck, played cards, and the current player.
 * Provides methods to generate and shuffle a deck of cards, update the active player, and manage game state.
 * 
 * @class
 */
export class Game {
    /**
     * The list of players currently participating in the game.
     * 
     * @type {Player[]}
     */
    public players: Player[]  = [];

    /**
     * The deck of cards for the game.
     * The deck is shuffled upon creation.
     * 
     * @type {string[]}
     */
    public deck: string[] = [];

    /**
     * The list of cards that have been played during the game.
     * 
     * @type {string[]}
     */
    public playedCards: string[] = [];

    /**
     * The index of the current player in the `players` array.
     * 
     * @type {number}
     */
    public currentPlayer: number = 0;

    /**
     * A boolean flag indicating whether the card pick animation is in progress.
     * 
     * @type {boolean}
     */
    public pickCardAnimation: boolean = false;

    /**
     * The card that was picked in the current turn.
     * If no card is picked, this will be `null`.
     * 
     * @type {string | null}
     */
    public pickedCard: string | null = null;

    /**
     * A boolean flag indicating whether the picked card should be displayed to the players.
     * 
     * @type {boolean}
     */
    public showPickedCard: boolean = false;

    /**
     * Creates a new game instance.
     * Initializes the game with a shuffled deck of cards.
     */
    constructor() {
        this.deck = this.generateDeck();
    }

    /**
     * Generates a shuffled deck of cards consisting of 4 suits (spades, hearts, diamonds, clubs) and 13 ranks.
     * 
     * @returns {string[]} - An array of shuffled card strings, where each card is represented as `suit_rank.png`.
     */
    generateDeck(): string[] {
        const suits = ['spade', 'hearts', 'diamonds', 'clubs'];
        const deck: string[] = [];
        for (const suit of suits) {
            for (let i = 1; i <= 13; i++) {
                deck.push(`${suit}_${i}.png`);
            }
        }
        return this.shuffle(deck);
    }

    /**
     * Shuffles an array of cards using the Fisher-Yates shuffle algorithm.
     * 
     * @param {string[]} array - The array of cards to be shuffled.
     * @returns {string[]} - The shuffled array of cards.
     */
    shuffle(array: string[]): string[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Updates the active player based on the current player's index.
     * Sets `isActive` property to `true` for the current player, and `false` for all other players.
     */
    updateActivePlayer(): void {
        this.players.forEach((player, index) => {
            player.isActive = index === this.currentPlayer;
        });
    }
}
