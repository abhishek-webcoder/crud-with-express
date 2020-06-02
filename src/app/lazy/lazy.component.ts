import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lazy',
  templateUrl: './lazy.component.html',
  styleUrls: ['./lazy.component.css']
})
export class LazyComponent implements OnInit {

  msg: string;

  @Input() message: string;
  //@Output() sendEventMessage = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  // loadmsg() : void{
  //   this.sendEventMessage.emit('Hello I am Abhishek Roy');
  // }
}


@NgModule({
  declarations: [LazyComponent],
  imports: [FormsModule],
})
class LazyComponentModule { }