import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../service/weather-data.service';
import { tap, take, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface City {
  lat: string;
  lon: string;
  name: string;
}
 
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
  providers: [WeatherDataService]
})
export class MainComponent implements OnInit {
 
  majorLtCities: City[] = [];
  weatherIcon: string;
  forecastWeatherIcon: string;
  weatherData;
  forecastWeatherData; 
  inputValue: string;
  showWeatherInfo: boolean = false;
  message: string = '';
  coordinates: string[];
  control = new FormControl();
  filteredOptions: Observable<string[]>;
 
  constructor(
    private weatherDataService: WeatherDataService,
  ) {}

  showCurrentWeather(): void {

    if (this.majorLtCities.some(item => item.name.toLowerCase() == this.inputValue.toLowerCase())) {
      this.showWeatherInfo = true;    

      this.weatherDataService.getCurrentWeatherByCity(this.inputValue.toLowerCase())
        .pipe(
          take(1),
          tap((data: any) => {
            this.weatherData = data;
          })
        )
        .subscribe();

      this.weatherDataService.getForecastByCity(this.inputValue.toLowerCase())
        .pipe(
          take(1),
          tap((data: any) => {
            this.forecastWeatherData = data.list.slice(0, 8); // forecated weather data for 24 hours
          })
        )
        .subscribe();
    }
    else if (this.majorLtCities.some(item => (item.lat + ','+ item.lon) == this.inputValue)) {
      this.showWeatherInfo = true;    
      this.weatherDataService.getCurrentWeatherByLatLon(this.inputValue)
        .pipe(
          take(1),
          tap((data: any) => {
            this.weatherData = data;
            this.weatherIcon = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
          })
        )
        .subscribe();

      this.weatherDataService.getForecastByLatLon(this.inputValue)
        .pipe(
          take(1),
          tap((data: any) => {
            this.forecastWeatherData = data.list.slice(0, 8);
          })
        )
        .subscribe();

    } else {
      this.message = 'Weather information not found';
      this.showWeatherInfo = false;
    }
  }
 
  ngOnInit() {
 
    this.majorLtCities = [
      {
        lat: '54.6892', 
        lon: '25.2798',
        name: 'Vilnius'
      },
      {
        lat: '54.9',
        lon: '23.9',
        name: 'Kaunas'
      },
      {
        lat: '55.7172',
        lon: '21.1175',
        name: 'Klaipėda'
      },
      {
        lat: '55.9333',
        lon: '23.3167',
        name: 'Šiauliai'
      },
      {
        lat: '55.7333',
        lon: '24.35',
        name: 'Panevėžys'
      }
    ];

    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(name => (name ? this._filter(name) : this.majorLtCities.slice())),
    );
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.majorLtCities.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}




