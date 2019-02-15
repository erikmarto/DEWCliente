import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProdId } from '../interfaces/i-prod-id';

@Injectable({
  providedIn: 'root'
})
export class ProductosIdService {
  loaded = false;
  productos_idx: IProdId;

  constructor(private http: HttpClient) {
    this.cargarProd();
  }

  private cargarProd() {
    this.http.get('https://portfolio-b0285.firebaseio.com/productos_idx.json')
      .subscribe((resp: IProdId) => {
        this.productos_idx = resp;
        this.loaded = true;
      });
  }
}

