import { Routes } from '@angular/router';
import { StartScreenComponent } from './features/start-screen/start-screen.component';
import { GameComponent } from './features/game/game.component';

export const routes: Routes = [
    { path: '', component: StartScreenComponent },
    { path: 'game', component: GameComponent },
];
