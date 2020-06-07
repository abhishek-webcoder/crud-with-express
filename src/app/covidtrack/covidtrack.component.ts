import { Component, OnInit } from '@angular/core';
import { CovidtrackService } from './covidtrack.service';

@Component({
  selector: 'app-covidtrack',
  templateUrl: './covidtrack.component.html',
  styleUrls: ['./covidtrack.component.css']
})
export class CovidtrackComponent implements OnInit {

  noData = false;
  countries: any[] = [];
  dataFor: string;
  indCountriesData: { Confirmed: number, Deaths: number, Recovered: number, Date: any };
  
  constructor( private trackService: CovidtrackService) { }

  ngOnInit(): void {

    this.trackService.worldCountries()
      .subscribe(
        (res) => {
          //console.log(res);
          // this.countries = res;
          for (let i = 0; i < res.length; i++) {
            // console.log(res[i]['Country']);
            this.countries.push({ "country": res[i]['Country'], "slug": res[i]['Slug'] });
          }
        },
        (err) => console.log(err)
      )
  }

  getCountryData(country: string) {
    this.trackService.worldData(country)
    .subscribe(
      (res) => 
      {
        // console.log(res[res.length - 1]);
        this.dataFor = country;
        if (res.length > 0) {
          this.noData = false;
          this.indCountriesData = {
            "Confirmed": res[res.length - 1]['Confirmed'],
            "Deaths": res[res.length - 1]['Deaths'],
            "Recovered": res[res.length - 1]['Recovered'],
            "Date": res[res.length - 1]['Date']
          };
        }
        else this.noData = true;
        
        console.log(this.indCountriesData);
      },
      (err) => console.log(err)
    )
  }

}
