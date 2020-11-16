import { Component} from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public newLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public newData = [ [350, 450, 100] ];

}
