import { Component } from '@angular/core';
import { InfoPageService } from './servicios/info-page.service';
import { ProductosService } from './servicios/productos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  constructor( public infoPageService : InfoPageService
             , public poductosService : ProductosService){

  }
}
