import { Routes } from '@angular/router';
import { DashboarComponent } from './dashboar/dashboar.component';
import { PersonalComponent } from './dashboar/personal/personal.component';
import { ServiciospatrullerosComponent } from './dashboar/serviciospatrulleros/serviciospatrulleros.component';

export const routes: Routes = [

  { path: 'dashboard', component: DashboarComponent,
    children:[
      {path:'serviciospat',component: ServiciospatrullerosComponent},
      {path:'personal',component:PersonalComponent}

    ]
  },
  {path:'',redirectTo:'dashboard',pathMatch:'full'}
];
