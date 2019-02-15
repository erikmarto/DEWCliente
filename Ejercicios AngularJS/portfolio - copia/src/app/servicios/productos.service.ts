import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProductsIdx } from '../interfaces/i-products-idx';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargado = false; 
  productos: IProductsIdx[] = []; 
  constructor( private http: HttpClient) { 
    this.cargarProductos();
  }


  private cargarProductos(){
    this.http.get('https://angular-html-917d9.firebaseio.com/productos_idx.json')
             .subscribe((resp:IProductsIdx[])=>{                
                this.productos = resp;
                this.cargado = true; 
             }); 
  }

  public getProductos(id:string){
     return  this.http.get(`https://angular-html-917d9.firebaseio.com/productos/${ id }.json`);
  }
}
