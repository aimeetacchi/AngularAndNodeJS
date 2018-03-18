import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { ListComponent } from '../components/list/list.component';

// Create Routes
const routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
           path: 'home',
            component: HomeComponent,
     },
     {
           path: 'list',
            component: ListComponent,
     },
  {
    path: '**',
          redirectTo: 'home',
         pathMatch: 'full'
   }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: []
})
export class RoutingModule {}

