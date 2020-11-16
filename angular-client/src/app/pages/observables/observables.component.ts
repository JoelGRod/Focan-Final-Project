import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styles: [
  ]
})
export class ObservablesComponent implements OnDestroy {

  public interval_subs: Subscription;

  constructor() {

    // Observable 1 subscription
    // this.return_observable()
    //   .pipe(
    //     retry(1)
    //   ).subscribe(
    //     value => console.log('Subs:', value),
    //     (err) => console.warn(err),
    //     () => console.info("obs finished")
    //   );

    // Observable 2 subscription 1
    // this.return_observable()
    //   .pipe(
    //     retry(1)
    //   ).subscribe(
    //     value => console.log(value)
    //   );

    // Observable 2 subscription 2
    // this.return_observable().subscribe( console.log );

    // Observable 3 subscription - Stopped with OnDestroy
    this.interval_subs = this.return_observable().subscribe( console.log );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.interval_subs.unsubscribe();
  }

  // Observable 1 definition
  // return_observable(): Observable<number> {
  //   let i = -1;

  //   return new Observable<number>(observer => {
  //     const interval = setInterval(() => {
  //       i++;
  //       observer.next(i);

  //       if (i === 4) {
  //         clearInterval(interval);
  //         observer.complete();
  //       }

  //       if (i === 2) {
  //         // observer finished
  //         i = -1;
  //         observer.error("i becomes 2");
  //       }

  //     }, 1000);
  //   });
  // }

  // Observable 2 definition
  // return_observable(): Observable<number> {
  //   return interval(500)
  //     .pipe(
  //       // Chain operators. Order matters
  //       map( value => value + 1 ),
  //       filter( value => (value % 2 === 0) ? true : false), // Only even values
  //       take(10),
  //     );
  // }

  // Observable 3 definition. Without take() - Unsubscribe necessary - OnDestroy
  return_observable(): Observable<number> {
    return interval(500)
      .pipe(
        // Chain operators. Order matters
        map( value => value + 1 ),
        filter( value => (value % 2 === 0) ? true : false), // Only even values
        );
  }

}
