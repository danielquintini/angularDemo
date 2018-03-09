import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../../core/route.service';
import { extract } from '../../core/i18n.service';
import { PageBComponent } from './page-b.component';

const routes: Routes = Route.withShell([
  { path: 'demo-a/page-b', component: PageBComponent, data: { title: extract('Home') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PageBRoutingModule { }
