import { provideNgxMask } from 'ngx-mask';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [...(appConfig.providers || []), provideNgxMask()],
}).catch((err) => console.error(err));
