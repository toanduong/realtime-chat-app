import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
export const appConfig: ApplicationConfig = {
  
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot()),
  ],
};