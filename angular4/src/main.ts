import { enableProdMode } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule, {
});
