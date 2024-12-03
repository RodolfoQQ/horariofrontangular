import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboar.component.html',
  styleUrl: './dashboar.component.css'
})
export class DashboarComponent {

  constructor(private router:Router,private routeactivate:ActivatedRoute ){}

  iraserviciospatrulleros(){
    this.router.navigate(["serviciospat"],{relativeTo:this.routeactivate})

  }
  irpersonal(){
    this.router.navigate(["personal"],{relativeTo:this.routeactivate})
  }


}
