import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoPageService } from 'src/app/servicios/info-page.service';
import { ScriptService } from 'src/app/servicios/script.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

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

