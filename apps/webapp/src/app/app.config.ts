import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideWalletAdapter({
      autoConnect: !!localStorage.getItem('autoConnect'),
    }),
    provideHttpClient(),
    importProvidersFrom([
      SweetAlert2Module.forRoot(),
    ])
  ],
};
