import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInfoPage } from '../interfaces/i-info-page';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {

  info : IInfoPage = {};

  equipo : any[] = [];

  cargada = false;

  constructor(private http:HttpClient) { 
    /* console.log("Info página cargada"); */
    this.cargaInfo();
    this.cargaEquipo();
  }

  private cargaInfo() {
    this.http.get('assets/data/data-page.json')
            .subscribe((resp:IInfoPage)=>{
              //PRIMERA VERSION
              /* console.log(resp);
              //esto esta hecho para javascript
              console.log(resp.twitter);
              //esto es para angular
              console.log(resp["facebook"]); */

              //SEGUNDA VERSION
              this.cargada = true;
              this.info = resp;
              console.log(this.info);
            });
  }

  private cargaEquipo(){

  }
}
