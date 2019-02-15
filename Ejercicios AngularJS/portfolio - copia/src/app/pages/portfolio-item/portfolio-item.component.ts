import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';
import { ActivatedRoute } from '@angular/router';
import { IProd } from 'src/app/interfaces/i-prod';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {

  producto : IProd;
  loaded : boolean = false;

  constructor(public productosService : ProductosService,
              public route : ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => 
      {
        this.productosService.getProductos(params['id'])
          .subscribe((resp: IProd) => {
            this.producto = resp;
            this.loaded = true;
          })
      });

  }

}
