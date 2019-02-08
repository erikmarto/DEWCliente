import { Component, OnInit } from '@angular/core';
import { IProduct} from '../interfaces/i-product';
import { HAMMER_LOADER } from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    title = "My product's list"; 
    header = { desc: 'Product', price: 'Price', avail: 'Available', image: 'Imagen' };
    showImage = true;
    lightTheme: boolean = true;
    filterSearch: string = '';

  product: IProduct[] = [{ 
    id: 1, 
    desc: 'SSD hard drive', 
    avail: new Date('2016-10-03'), 
    price: 75,
    imageUrl: 'assets/ssd.jpg', 
    rating: 5 }
    , { id: 2, 
      desc: 'LGA1151 Motherboard', 
      avail: new Date('2016-09-15'), 
      price: 96.95, 
      imageUrl: 'assets/motherboard.jpg', 
      rating: 4 }];

  toggleImage() {    
    this.showImage = !this.showImage;  
  }

  toggleTheme = () => {
    this.lightTheme = !this.lightTheme;
  }

  constructor() { }

  ngOnInit() { }
}
