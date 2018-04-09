import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../../core/route.service';
import { extract } from '../../core/i18n.service';
import { PageAComponent } from './page-a.component';

const routes: Routes = Route.withoutShell([
  { path: 'demo-a/page-a', component: PageAComponent, data: { title: extract('Home') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PageARoutingModule { }
