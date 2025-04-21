import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
// Entfernt reCAPTCHA und AppCheck
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDataConnect, provideDataConnect } from '@angular/fire/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "ringoffire-d3bdb",
      appId: "1:732045064960:web:28a5463da594aff4d991e5",
      storageBucket: "ringoffire-d3bdb.firebasestorage.app",
      apiKey: "AIzaSyDboN3bCGHdE2UYl8XmbaWkc18IA0Bu1QA",
      authDomain: "ringoffire-d3bdb.firebaseapp.com",
      messagingSenderId: "732045064960",
      measurementId: "G-XGC0Y38BBN"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDataConnect(() => getDataConnect(connectorConfig)),
    provideTanStackQuery(new QueryClient()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideVertexAI(() => getVertexAI())
  ]
};

