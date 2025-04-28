import { Component, OnInit }      from '@angular/core';
import { IonicModule }            from '@ionic/angular';
import { FormsModule }            from '@angular/forms';
import { Router, RouterModule }   from '@angular/router';
import { Storage }                from '@ionic/storage-angular';
import { Geolocation }            from '@capacitor/geolocation';
import { HttpClient }             from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface WeatherResponse {
  location: { name: string; country: string };
}

@Component({
  standalone:   true,
  selector:     'app-home',
  templateUrl:  './home.page.html',
  styleUrls:    ['./home.page.scss'],
  imports: [IonicModule, FormsModule, RouterModule    
  ]
})
export class HomePage implements OnInit {
  city = '';
  private readonly API_KEY = '21a41e85e3d2430494d121457252504'; //API received from https://www.weatherapi.com

  constructor(
    private router: Router,
    private storage: Storage,
    private http:    HttpClient
  ) {}

  async ngOnInit() {
    await this.storage.create();
    const last = await this.storage.get('lastCity');
    if (last) {
      this.city = last;
    }
  }

  // Called when 'Get Weather' is pressed
  async go() {
    if (!this.city.trim()) { return; }
    await this.storage.set('lastCity', this.city.trim());
    this.router.navigate(['/forecast'], {
      queryParams: { city: this.city.trim() }
    });
  }

  async useMyLocation() {

      //Get GPS coords
      const pos = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = pos.coords;
  
      //Get weather of current location
      const url =
        `https://api.weatherapi.com/v1/current.json` +
        `?key=${this.API_KEY}` +
        `&q=${latitude},${longitude}`;
  
      const resp = await firstValueFrom(
        this.http.get<WeatherResponse>(url)
      );
  
      //Set the city field and store it
      this.city = resp.location.name;
      await this.storage.set('lastCity', this.city);

    }
  }
 
