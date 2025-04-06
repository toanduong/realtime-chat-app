import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { authInterceptor } from './app/services/auth.interceptor'
import { TranslateModule } from '@ngx-translate/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(BrowserAnimationsModule, TranslateModule.forRoot()),
  ]
});