import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Player } from '../../../shared/models/player.model';

/**
 * A dialog component for editing a player's name and profile image.
 *
 * Opens with the current player data and allows the user to update and save changes.
 * Returns the updated player object upon confirmation or closes without saving.
 *
 * @component
 */
@Component({
  selector: 'app-dialog-edit-player',
  imports: [FormsModule, CommonModule, MatDialogModule],
  templateUrl: './dialog-edit-player.component.html',
  styleUrl: './dialog-edit-player.component.sass'
})
export class DialogEditPlayerComponent implements OnInit {
  /**
   * The updated name of the player, bound to the input field.
   */
  playerName: string = '';

  /**
   * The currently selected profile image path.
   */
  selectedProfileImage: string = '';

  /**
   * A predefined list of available profile images to choose from.
   */
  profileImages: string[] = [
    'img/profile/actor_profile.png',
    'img/profile/alien_profile.png',
    'img/profile/comic_guy_profile.png',
    'img/profile/men_profile.png',
    'img/profile/kitten_profile.png',
    'img/profile/woman_profile.png',
  ];

  /**
   * Constructs the dialog component and injects the dialog reference and incoming player data.
   *
   * @param dialogRef - Reference to the currently opened dialog.
   * @param data - The player data passed into the dialog for editing.
   */
  constructor(
    public dialogRef: MatDialogRef<DialogEditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player
  ) {}

  /**
   * Initializes the component state using the injected player data.
   * Sets the player name and selected profile image.
   */
  ngOnInit(): void {
    this.playerName = this.data.name;
    this.selectedProfileImage = this.data.profileImage;
  }

  /**
   * Sets the selected profile image to the specified path.
   *
   * @param imagePath - The path of the selected profile image.
   */
  selectProfileImage(imagePath: string): void {
    this.selectedProfileImage = imagePath;
  }

  /**
   * Closes the dialog and returns the updated player object with the new name and profile image.
   */
  savePlayer(): void {
    this.dialogRef.close({
      ...this.data,
      name: this.playerName,
      profileImage: this.selectedProfileImage
    });
  }

  /**
   * Cancels the edit and closes the dialog without saving any changes.
   */
  cancel(): void {
    this.dialogRef.close();
  }
}

