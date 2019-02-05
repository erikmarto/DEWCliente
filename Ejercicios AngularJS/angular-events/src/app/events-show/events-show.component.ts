import { Component, OnInit } from '@angular/core';
import { IEvent} from '../interfaces/i-events';

@Component({
  selector: 'app-events-show',
  templateUrl: './events-show.component.html',
  styleUrls: ['./events-show.component.css']
})

export class EventsShowComponent implements OnInit {

events: IEvent[] = [{ 
  title: 'PEPE',
  image: 'string',
  date: '12-3-1045',  
  description: 'ee',
  price: 75, 
}];

eventos: IEvent[] = [{ 
  title: 'Erik',
  image: 'string',
  date: '12-3-1045',  
  description: 'ee',
  price: 75, 
}];

constructor() { }

  ngOnInit() {
  }

}
