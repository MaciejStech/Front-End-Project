import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { IonicModule } from '@ionic/angular';

interface WeatherResponse {
  location: { name: string; region: string; country: string; };
  current: {
    temp_c:    number;
    condition: { text: string; icon: string; };   
    gust_mph: number;
    feelslike_c: number;
  };
}

@Component({
  standalone: true,
  selector: 'app-forecast',
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.scss'],
  imports: [ CommonModule, IonicModule]
})
export class ForecastPage implements OnInit {
  weather$!: Observable<WeatherResponse>;

  //API Key from https://www.weatherapi.com/my/
  private API_KEY = '21a41e85e3d2430494d121457252504';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.weather$ = this.route.queryParams.pipe(
      map(params => params['city'] as string),
      switchMap(city => {
        const url = `https://api.weatherapi.com/v1/current.json?key=${this.API_KEY}&q=${encodeURIComponent(city)}`;
        return this.http.get<WeatherResponse>(url);
      })
    );
  }
}
