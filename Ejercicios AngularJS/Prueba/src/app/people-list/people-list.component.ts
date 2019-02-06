import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  title='ngStyle';
  title2='ngClass';
  
  people = [
    {
      name:"erik",
      country:"España"
    },
    {
      name:"oscar",
      country:"Alemania"
    },
    {
      name:"marta",
      country:"Mexico"
    },
    {
      name:"maria",
      country:"Suiza"
    },
  ]

  getColor (country) {
    switch (country){
      case 'España':
        return "pink";
      case 'Alemania':
        return "yellow";
      case 'Mexico':
        return "grey";
      case 'Suiza':
        return "blue";
    }
  }

  getColorClases (country) {
    switch (country){
      case 'España':
        return "bg-danger";
      case 'Alemania':
        return "bg-danger";
      case 'Mexico':
        return "bg-warning";
      case 'Suiza':
        return "bg-info";
    }
  }

  constructor() { }

  
  ngOnInit() {
  }

}
