import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Ejemplo de promesa
  //   const promise = new Promise((resolve, reject) => {
  //     let n = 1;
  //     if(n == 0) {
  //       resolve("Works");
  //     } else {
  //       reject("Not works");
  //     }
  //   });

  //   promise
  //   .then( msj => console.log(`Promise: ${msj}`))
  //   .catch( error => console.log(`Promise: ${error}`));

  //   console.log("Fin del init");

  this.getUsuarios()
  .then(resp => console.log(resp))
  .catch(error => console.log(error));
  
  }

  // Petición a API. 1ª forma:
  // getUsuarios() {
  //   fetch('https://reqres.in/api/users')
  //     .then( resp => {
  //       resp.json()
  //       .then( resp => console.log(resp.data) ) 
  //     })
  //     .catch( error => console.log(error));
  // }

  // Petición a API. 2ª forma: + limpio
  // getUsuarios() {
  //   fetch('https://reqres.in/api/users')
  //     .then( resp => resp.json() )
  //     .then( resp => console.log(resp.data) )
  //     .catch( error => console.log(error));
  // }

  getUsuarios() {
    return new Promise( (resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json() )
        .then( resp => resolve(resp.data) )
        .catch( error => reject(error));
    });
  }
  

}
