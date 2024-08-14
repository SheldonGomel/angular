import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { youtubeApiInterceptor } from './youtube/services/youtube-api.interceptor';
import { reducers } from './redux/reducers/app.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([youtubeApiInterceptor])),
    provideStore(reducers),
    // provideStore({ apiVideos: apiVideosReduser }),
    // provideRouterStore(),
    // provideStoreDevtools(),
    // provideEffects([DataEffects]),
  ],
};
