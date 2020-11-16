import { NgModule } from '@angular/core';

// Pipes
import { ImagePipe } from './image.pipe';



@NgModule({
  declarations: [
    ImagePipe
  ],
  exports: [
    ImagePipe
  ]
})
export class PipesModule { }
