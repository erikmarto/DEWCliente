import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/servicios/productos.service';
import { IProducts } from 'src/app/interfaces/i-products';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto : IProducts = {};
  id :String;
  constructor(private route:ActivatedRoute, public productosService:ProductosService) { }

  ngOnInit() {
    this.route.params.subscribe(parametros=>{ 
            this.productosService.getProductos(parametros['id'])
                                .subscribe((producto:IProducts) =>{                            
                                  this.producto  = producto; 
                                  this.id = parametros["id"]; 
                                 
     });
    });
  }

}
