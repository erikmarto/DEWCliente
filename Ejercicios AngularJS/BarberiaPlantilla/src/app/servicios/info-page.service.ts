import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInfoPage } from '../interfaces/i-info-page';
import { IEquipo } from '../interfaces/i-equipo';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  info: IInfoPage = {};
  equipo: IEquipo = {};

  cargada = false;
  constructor(private http: HttpClient) {
    this.cargaInfo();
    this.cargaEquipo();
  }

  private cargaInfo() {
    this.http.get('assets/data/data-page.json')
      .subscribe((respuesta: IInfoPage) => {
        this.cargada = true;
        this.info = respuesta;
        /* console.log(this.info); */
      });
  }

  private cargaEquipo() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/equipo.json')
      .subscribe((respuesta: IEquipo) => {
        this.cargada = true;
        this.equipo = respuesta;
        /* console.log(this.equipo); */
      });
  }
}
