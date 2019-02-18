import { Injectable } from '@angular/core';
import { IInfoPage } from '../interfaces/i-info-page';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoPageService {
  info: IInfoPage = {};

  cargada = false;
  constructor(private http: HttpClient) {
    this.cargaInfo();
  }

  private cargaInfo() {
    this.http.get('assets/data/data-page.json')
      .subscribe((respuesta: IInfoPage) => {
        // console.log(respuesta);
        // console.log(respuesta.twitter);
        // console.log(respuesta["facebook"]);
        this.cargada = true;
        this.info = respuesta;
        console.log(this.info);
      });
  }
}
