import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInfoPage } from '../interfaces/i-info-page';
import { IEquipo } from '../interfaces/i-equipo';
import { IEstilos } from '../interfaces/i-estilos';
import { IServicios } from '../interfaces/i-servicios';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  info: IInfoPage = {};
  equipo: IEquipo[] = [];
  estilos: IEstilos[] = [];
  /* servicios: IServicios[] = []; */

  cargada = false;
  constructor(private http: HttpClient) {
    this.cargaInfo();
    this.cargaEquipo();
    this.cargaEstilos();
    /* this.cargaServicios(); */
  }

  private cargaInfo() {
    this.http.get('assets/data/data-page.json')
      .subscribe((respuesta: IInfoPage) => {
        this.cargada = true;
        this.info = respuesta;
      });
  }

  private cargaEquipo() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/equipo.json')
      .subscribe((respuesta: IEquipo[]) => {
        this.cargada = true;
        this.equipo = respuesta;
      });
  }

  private cargaEstilos() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/estilos.json')
      .subscribe((respuesta: IEstilos[]) => {
        this.cargada = true;
        this.estilos = respuesta;
      });
  }

  /* private cargaServicios() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/servicios.json')
      .subscribe((respuesta: IServicios[]) => {
        this.cargada = true;
        this.servicios = respuesta;
      });
  } */
}
