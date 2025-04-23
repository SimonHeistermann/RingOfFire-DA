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
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.sass'
})
export class DialogAddPlayerComponent {
  readonly dialogRef = inject(MatDialogRef<DialogAddPlayerComponent>);
  name: string = '';

  constructor(private firestore: Firestore) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPlayer(name: string): void {
    this.dialogRef.close(name);
  }

}
