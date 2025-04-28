import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [IonApp, IonRouterOutlet, RouterModule],
  template: `
  <ion-app>
    <ion-router-outlet />
  </ion-app>`
})
export class AppComponent {
}
