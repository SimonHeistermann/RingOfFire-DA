import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Player } from '../../../shared/models/player.model';


@Component({
  selector: 'app-dialog-edit-player',
  imports: [FormsModule, CommonModule, MatDialogModule],
  templateUrl: './dialog-edit-player.component.html',
  styleUrl: './dialog-edit-player.component.sass'
})
export class DialogEditPlayerComponent implements OnInit {
  playerName: string = '';
  selectedProfileImage: string = '';
  profileImages: string[] = [
    'img/profile/actor_profile.png',
    'img/profile/alien_profile.png',
    'img/profile/comic_guy_profile.png',
    'img/profile/men_profile.png',
    'img/profile/kitten_profile.png',
    'img/profile/woman_profile.png',
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogEditPlayerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Player
  ) {}

  ngOnInit(): void {
    this.playerName = this.data.name;
    this.selectedProfileImage = this.data.profileImage;
  }

  selectProfileImage(imagePath: string): void {
    this.selectedProfileImage = imagePath;
  }

  savePlayer(): void {
    this.dialogRef.close({
      ...this.data,
      name: this.playerName,
      profileImage: this.selectedProfileImage
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  
}
