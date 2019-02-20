import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoPageService } from 'src/app/servicios/info-page.service';
import { ScriptService } from 'src/app/servicios/script.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(public infoPageService: InfoPageService, public script: ScriptService) { }

  ngOnInit() {
    this.script.load('main').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  ngOnDestroy() {
    this.script.unload(1);
  }

}
