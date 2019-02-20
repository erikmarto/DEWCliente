import { Injectable } from '@angular/core';
import { ScriptBarber } from './../script.barber';

declare var document: any;

@Injectable({
  providedIn: 'root'
})

export class ScriptService {

  private scripts: any = {};

  constructor() {
    ScriptBarber.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    var promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  unload(scriptNumber: number) {
    var head = document.getElementsByTagName('head')[0];
    var chiLen = head.childNodes.length - 1;

    for (var i = chiLen; i > chiLen - scriptNumber; i--) {
      head.removeChild(head.childNodes[i]);
    }
    console.log(head);
  }
  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      //resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      }
     
      //load script
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.scripts[name].src;
      if (script.readyState) {  //IE
        script.onreadystatechange = () => {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            this.scripts[name].loaded = true;
            resolve({ script: name, loaded: true, status: 'Loaded' });
          }
        };
      } else {  //Others
        script.onload = () => {
          this.scripts[name].loaded = true;
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
      }
      script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
      document.getElementsByTagName('head')[0].appendChild(script);
      console.log(this.scripts);

    });
  }
}
