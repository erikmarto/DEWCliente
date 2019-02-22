import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IInfoPage } from '../interfaces/i-info-page';
import { IEquipo } from '../interfaces/i-equipo';
import { IEstilos } from '../interfaces/i-estilos';
import { IEmpieza } from '../interfaces/i-empieza';
import { IBlog } from '../interfaces/i-blog';
import { IServiciosOfertados } from '../interfaces/i-servicios-ofertados';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  info: IInfoPage = {};
  empieza: IEmpieza = {};
  equipo: IEquipo[] = [];
  estilos: IEstilos[] = [];
  blogs: IBlog[] = [];
  servicios: IServiciosOfertados[] = [];

  cargada = false;
  constructor(private http: HttpClient) {
    this.Info();
    this.Equipo();
    this.Estilos();
    this.Blog();
    this.Empieza();
    this.serviciosOfertados();
  }

  private Info() {
    this.http.get('assets/data/data-page.json')
      .subscribe((respuesta: IInfoPage) => {
        this.cargada = true;
        this.info = respuesta;
      });
  }

  private Equipo() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/equipo.json')
      .subscribe((respuesta: IEquipo[]) => {
        this.cargada = true;
        this.equipo = respuesta;
      });
  }

  private Estilos() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/estilos.json')
      .subscribe((respuesta: IEstilos[]) => {
        this.cargada = true;
        this.estilos = respuesta;
      });
  }

  private Blog() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/blog.json')
      .subscribe((respuesta: IBlog[]) => {
        this.cargada = true;
        this.blogs = respuesta;
      });
  }

  private Empieza() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/empieza.json')
      .subscribe((respuesta: IEmpieza) => {
        this.cargada = true;
        this.empieza = respuesta;
      });
  }

  private serviciosOfertados() {
    this.http.get('https://barberia-fc7d1.firebaseio.com/servicios_ofertados.json')
      .subscribe((respuesta: IServiciosOfertados[]) => {
        this.cargada = true;
        this.servicios = respuesta;
      });
  }
}
