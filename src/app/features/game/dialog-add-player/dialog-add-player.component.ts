import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * A dialog component that allows the user to add a new player by name.
 * 
 * This component is used within a `MatDialog` context and returns the entered
 * name to the calling component when submitted.
 *
 * @component
 * @example
 * <app-dialog-add-player></app-dialog-add-player>
 */
@Component({
  selector: 'app-dialog-add-player',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule,
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.sass'
})
export class DialogAddPlayerComponent {
  /**
   * Reference to the currently opened dialog.
   * Used to close the dialog and optionally pass back data.
   */
  readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);

  /**
   * The name of the player to be added.
   * Two-way bound to the input field in the template.
   */
  name: string = '';

  /**
   * Creates an instance of the component and injects the Firestore service.
   *
   * @param firestore - The Firestore instance used for potential database operations.
   */
  constructor(private firestore: Firestore) {}

  /**
   * Closes the dialog without submitting any data.
   * Typically triggered by the "Cancel" button.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Closes the dialog and submits the entered player name.
   * 
   * @param name - The name of the player to be added.
   */
  addPlayer(name: string): void {
    this.dialogRef.close(name);
  }
}

