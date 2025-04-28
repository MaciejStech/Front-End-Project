import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HomePage } from './app/home/home.page';
import { ForecastPage } from './app/forecast/forecast.page';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      IonicModule.forRoot(),
      IonicStorageModule.forRoot()
    ),
    provideHttpClient(),
    provideRouter([
      { path: '',          component: HomePage },
      { path: 'forecast',  component: ForecastPage },
    ]),
  ]
});
