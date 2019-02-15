import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInfoPage } from '../interfaces/i-info-page';
import { IEquipo } from '../interfaces/i-equipo';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
info : IInfoPage = {};
equipo: IEquipo = {};

cargada = false; 
  constructor(private http:HttpClient) { 
    //console.log("Info página cargada");
    this.cargaInfo();
    this.cargaEquipo();
  }

  private cargaInfo(){
    this.http.get('assets/data/data-page.json')
    .subscribe((respuesta:IInfoPage)=>{
       // console.log(respuesta);
       // console.log(respuesta.twitter);
       // console.log(respuesta["facebook"]);
       this.cargada = true; 
       this.info = respuesta; 
       console.log(this.info);
    });
  }

  private cargaEquipo(){
    this.http.get('https://portfolio-2064c.firebaseio.com/equipo.json')
    .subscribe((respuesta:IEquipo)=>{
       this.cargada = true; 
       this.equipo = respuesta; 
       console.log(this.equipo);
    });
  }
}
