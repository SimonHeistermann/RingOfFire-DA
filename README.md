# Ring of Fire

> A real-time multiplayer card game web app — training project from Developer Akademie.

## Disclaimer

This is a **training project** built as part of my education at [Developer Akademie](https://developerakademie.com/). It is not a commercial product and is not intended for real-world use. This is not a real gaming platform — no real services are provided. Do not enter real personal data.

## About

Ring of Fire is a digital implementation of the popular card drinking game. Players take turns drawing cards from a shuffled deck, with each card triggering a specific rule or action. The game state is synchronized in real-time across all connected clients using Firebase Firestore.

This project demonstrates skills in Angular component architecture, real-time data synchronization, Material Design integration, and responsive web design.

## Tech Stack

- **Framework:** Angular 19 (standalone components)
- **UI Library:** Angular Material 19
- **Backend:** Firebase Firestore (real-time database)
- **Styling:** SASS
- **Language:** TypeScript
- **Fonts:** Cinzel Decorative, Raleway, Roboto, Material Icons (all self-hosted)

## Features

- Create and join multiplayer game sessions via unique URLs
- Draw cards from a shuffled 52-card deck with animations
- Add, edit, and remove players with custom avatars
- Real-time game state synchronization across clients
- Game info panel showing current card rules
- Game over detection with restart functionality
- Responsive design for desktop and mobile

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (included with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

```bash
git clone https://github.com/simon-heistermann/ringoffire.git
cd ringoffire
npm install
```

### Running

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser.

### Building

```bash
ng build
```

Build artifacts are stored in the `dist/` directory.

## Legal

- [Impressum / Legal Notice](/impressum)
- [Privacy Policy](/privacy-policy)
- [Disclaimer](/disclaimer)

## Author

**Simon Maximilian Heistermann**
- Website: [simon-heistermann.de](https://simon-heistermann.de)
- Email: simon@heistermann-solutions.de
- LinkedIn: [Simon Heistermann](https://www.linkedin.com/in/simon-heistermann/)

## License

This project is part of a training curriculum and is not licensed for commercial use.
