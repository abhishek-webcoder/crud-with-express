import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css']
})
export class LazyComponent implements OnInit {

  @Input() message: string;
  @Output() sendEventMessage = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  load() {
    this.sendEventMessage.emit('Hello I am Abhishek Roy');
  }

}
