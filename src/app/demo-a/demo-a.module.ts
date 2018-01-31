import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PageARoutingModule } from './page-a/page-a-routing.module';
import { PageAComponent } from './page-a/page-a.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
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
