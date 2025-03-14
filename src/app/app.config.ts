import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateModuleConfig} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const provideTranslation = (): TranslateModuleConfig => ({
  defaultLanguage: 'fa',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes),
    importProvidersFrom([TranslateModule.forRoot(provideTranslation())])
  ]
};
