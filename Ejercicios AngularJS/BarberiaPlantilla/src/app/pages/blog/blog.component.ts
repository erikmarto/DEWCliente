import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScriptService } from 'src/app/servicios/script.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

  constructor(public script: ScriptService) { }

  ngOnInit() {
    this.script.load('main').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  ngOnDestroy() {
    this.script.unload(1);
  }
}
