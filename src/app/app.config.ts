import { ApplicationConfig } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
            withEnabledBlockingInitialNavigation()
        ),

        provideHttpClient(
            withFetch()
        ),

        provideAnimationsAsync()
    ]
};