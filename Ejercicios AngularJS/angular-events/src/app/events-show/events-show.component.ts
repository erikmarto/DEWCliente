import { Component, OnInit } from '@angular/core';
import { IEvent } from '../interfaces/i-event';

@Component({
  selector: 'app-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.css']
})

export class EventsShowComponent implements OnInit {
  search: string = "";
  sortedPriceAsc: boolean = false;
  sortedDateAsc: boolean = false;

  newEvent: IEvent = {
    title: '',
    description: '',
    image: '',
    price: 0,
    date: ''
    };

  events: IEvent[] = [{
    title: 'nuevo evento 1',
    image: 'assets/evento1.jpg',
    date: '12-3-1045',
    description: 'ee',
    price: 75,
  },
  {
    title: 'nuevo evento 2',
    image: 'assets/evento2.jpg',
    date: '4-5-3045',
    description: 'gbfds',
    price: 233,
  },
  {
    title: 'nuevo evento 3',
    image: 'assets/evento3.jpg',
    date: '1-12-1345',
    description: 'rretre',
    price: 500,
  },
  {
    title: 'nuevo evento 4',
    image: 'assets/evento4.jpg',
    date: '9-5-3215',
    description: 'preprew',
    price: 931,
  }];

  orderDate = () => {
    this.search = "";
    if (!this.sortedDateAsc) {
      this.events.sort((a:IEvent, b:IEvent) => (a.date > b.date) ? 1 : (a.date < b.date) ? -1 : 0);
    } else {
      this.events.sort((a:IEvent, b:IEvent) => (a.date > b.date) ? -1 : (a.date < b.date) ? 1 : 0);
    }
    this.sortedDateAsc = !this.sortedDateAsc;
  }

  orderPrice = () => {
    this.search = "";
    if (!this.sortedPriceAsc) {
      this.events.sort((a:IEvent, b:IEvent) =>(a.price > b.price) ? 1 : (a.price < b.price) ? -1 : 0);
    } else {
      this.events.sort((a:IEvent, b:IEvent) =>(a.price > b.price) ? -1 : (a.price < b.price) ? 1 : 0);
    }
    this.sortedPriceAsc = !this.sortedPriceAsc;
  }

  addEvent = () => {
    //TODO - validate
    this.events.push(this.newEvent);
  }

  constructor() { }

  ngOnInit() {
  }

}
