import { ApplicationConfig, provideZoneChangeDetection, ValueProvider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { provideAuth0 } from '@auth0/auth0-angular';

const Snack_Bar_Config: ValueProvider = {
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  } as MatSnackBarConfig
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), provideClientHydration(), 
    provideAnimationsAsync(), provideHttpClient(),
    Snack_Bar_Config,
    provideAuth0({
      domain: 'dev-ez2o676qz3a48onh.us.auth0.com',
      clientId: 'gaEnvJSeXefycQkyXXVbBVd6nXVdTIOj',
      authorizationParams: {
        redirect_uri: 'http://localhost:4200',
        audience: 'https://dev-ez2o676qz3a48onh.us.auth0.com/api/v2/',
        scope: 'openid profile email offline_access'
      },
      useRefreshTokens: true,
      cacheLocation: 'localstorage',
    }),
  ]
};