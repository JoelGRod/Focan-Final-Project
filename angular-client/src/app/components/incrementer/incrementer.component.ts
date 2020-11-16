import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})
export class IncrementerComponent implements OnInit {
  ngOnInit() {
    this.btn_class = `btn ${ this.btn_class }`;
  }

  // Inputs
  @Input('value') progress: number = 50;
  @Input() btn_class: string = 'btn-primary';

  // Outputs
  @Output('value') outValue: EventEmitter<number> = new EventEmitter();

  changeValue( value: number) {
    if(this.progress >= 100 && value > 0 ) {
      this.outValue.emit(100);
      return this.progress = 100;
    }
    if(this.progress <= 0 && value < 0 ) {
      this.outValue.emit(0);
      return this.progress = 0;
    }
    this.progress = this.progress + value;
    this.outValue.emit(this.progress);
  }

  onChange( value ) {
    if ( value >= 100 ) {
      this.progress = 100;
    } else if ( value <= 0 ) {
      this.progress = 0;
    } else {
      this.progress = value;
    }

    this.outValue.emit(this.progress);
  }

}
