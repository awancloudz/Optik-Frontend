import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DistributorComponent } from './distributor/distributor.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'distributor', component: DistributorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
