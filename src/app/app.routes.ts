import { Routes } from '@angular/router';
import { StartScreenComponent } from './features/start-screen/start-screen.component';
import { GameComponent } from './features/game/game.component';
import { ImpressumComponent } from './features/legal/impressum/impressum.component';
import { PrivacyPolicyComponent } from './features/legal/privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './features/legal/disclaimer/disclaimer.component';

/**
 * The routing configuration for the application.
 *
 * This configuration defines the available routes and their associated components.
 * The routes handle navigation within the app, mapping paths to components to be rendered.
 *
 * @constant
 * @type {Routes}
 */
export const routes: Routes = [
    /**
     * The route for the start screen of the game.
     *
     * This path (`''`) corresponds to the root of the application and renders the `StartScreenComponent`.
     *
     * @route
     * @path ''
     * @component StartScreenComponent
     */
    { path: '', component: StartScreenComponent },

    /**
     * The route for a specific game view.
     *
     * This path (`'game/:id'`) dynamically loads the `GameComponent` based on the `id` parameter in the URL.
     * It is used to display the details of a game with a unique identifier.
     *
     * @route
     * @path 'game/:id'
     * @component GameComponent
     */
    { path: 'game/:id', component: GameComponent },

    { path: 'impressum', component: ImpressumComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'disclaimer', component: DisclaimerComponent },
];
  
