import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, expand, EMPTY  } from 'rxjs';

export interface SwapiPlanetResponse {
    next: string;
    results: { name: string; }[];
}
@Injectable({
  providedIn: 'root'
})
export class SwapiService {

  constructor(private httpSvc: HttpClient) { }

  loadPlanets = () => {
    //const p1 = this.httpSvc.get<SwapiPlanetResponse>("https://swapi.dev/api/planets/");
    //const p2 = this.httpSvc.get<SwapiPlanetResponse>("https://swapi.dev/api/planets?page=2");
    
   // return concat(p1, p2);

    const p1 = this.httpSvc.get<SwapiPlanetResponse>("https://swapi.dev/api/planets/");
    return p1.pipe (
        expand (x => x.next ? this.httpSvc.get<SwapiPlanetResponse>(x.next) : EMPTY)
    )
  }
}
