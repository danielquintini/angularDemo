import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { PageARoutingModule } from './page-a/page-a-routing.module';
import { PageAComponent } from './page-a/page-a.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PageARoutingModule,
  ],
  declarations: [
  	PageAComponent
  ],
  entryComponents: [
    PageAComponent
  ]
})
export class DemoAModule { }
