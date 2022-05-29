import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface City {
  lat: string;
  lon: string;
  name: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {
 
  constructor(
    private http: HttpClient,
  ) {}
 
  getCurrentWeatherByCity(name: string): Observable<City>{
    const apiKey = '0da871a4d5baef25083beade78885f75';  
    return this.http.get<City>('https://api.openweathermap.org/data/2.5/weather?q=' + name + '&appid=' + apiKey + '&units=metric');
  }
 
  getCurrentWeatherByLatLon(latLon: string): Observable<City>{
    const apiKey = '0da871a4d5baef25083beade78885f75';
    let coordinates;
    coordinates = latLon.split(',');
 
    return this.http.get<City>(
      'https://api.openweathermap.org/data/2.5/weather?lat='+ coordinates[0] + '&lon='+ coordinates[1] 
      + '&appid=' + apiKey + '&units=metric'
    );
  }

  getForecastByCity(name: string): Observable<City>{
    const apiKey = '0da871a4d5baef25083beade78885f75';  
    return this.http.get<City>('https://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=' + apiKey + '&units=metric');
  }

  getForecastByLatLon(latLon: string): Observable<City>{
    const apiKey = '0da871a4d5baef25083beade78885f75';
    let coordinates;
    coordinates = latLon.split(',');
 
    return this.http.get<City>(
      'https://api.openweathermap.org/data/2.5/forecast?lat='+ coordinates[0] + '&lon='+ coordinates[1] 
      + '&appid=' + apiKey + '&units=metric'
    );
  }

}
