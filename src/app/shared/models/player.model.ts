/**
 * The interface representing a player in the game.
 * 
 * This interface defines the structure of a player object, which includes the player's ID, name, profile image, and whether the player is currently active.
 * 
 * @interface
 */
export interface Player {
    /**
     * The unique identifier of the player.
     * 
     * @type {number}
     */
    id: number;

    /**
     * The name of the player.
     * This is the display name that will be shown during the game.
     * 
     * @type {string}
     */
    name: string;

    /**
     * The path to the profile image of the player.
     * This image will be displayed as the player's avatar in the game.
     * 
     * @type {string}
     */
    profileImage: string;

    /**
     * A flag indicating whether the player is currently active in the game.
     * Only one player can be active at a time, typically the player whose turn it is.
     * 
     * @type {boolean}
     */
    isActive: boolean;
}
