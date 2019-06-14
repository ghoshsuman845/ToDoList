import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import{MainComponent} from './main/main.component';
import {SideBarComponent} from './side-bar/side-bar.component';


const routes: Routes = [
  { path: '', redirectTo: '/side-bar', pathMatch: 'full' },
  
  { path: 'side-bar',
   component: SideBarComponent ,
   children: [
    {
        path: '',
        component: DashboardComponent ,
        
     },
    {
      path: 'main',
      component: MainComponent ,
    },
    
     
 
 
]
   

  },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
