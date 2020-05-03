import { Component, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'MonnyFE';

  opened:boolean = false;

  constructor() { }

  sindenavOpenClose()
  {
    if (this.opened == true)
    {
      this.opened = false;
    }
    else
    {
      this.opened = true;
    }
  }
}
