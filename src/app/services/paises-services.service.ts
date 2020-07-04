import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisesServicesService {

  constructor(private http: HttpClient) { }

  getPaises()
  {
   return  this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(map( (response: any[]) =>  {


     return response.map( pais =>       ( {name: pais.name, code: pais.alpha3Code }));


   }));
  }
}
