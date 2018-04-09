import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { PageARoutingModule } from './page-a/page-a-routing.module';
import { PageBRoutingModule } from './page-b/page-b-routing.module';
import { PageAComponent } from './page-a/page-a.component';
import { PageBComponent } from './page-b/page-b.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    PageARoutingModule,
    PageBRoutingModule
  ],
  declarations: [
  	PageAComponent,
  	PageBComponent
  ],
  entryComponents: [
    PageAComponent
  ]
})
export class DemoAModule { }
