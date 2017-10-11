import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { LoaderComponent } from './loader/loader.component';
import { JokeService } from './joke.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule
  ],
  declarations: [
    LoaderComponent
  ],
  providers:[
    JokeService
  ],
  exports: [
    LoaderComponent
  ]
})
export class SharedModule { }
