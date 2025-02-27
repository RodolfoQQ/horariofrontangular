import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-dashboar',
  standalone: true,
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './dashboar.component.html',
  styleUrl: './dashboar.component.css',


})
export class DashboarComponent {

  constructor(private router:Router,private routeactivate:ActivatedRoute ){}

  ngOnInit(): void {
    this.irpersonal()
  }

  iraserviciospatrulleros(){
    this.router.navigate(["serviciospat"],{relativeTo:this.routeactivate})
  }

  irpersonal(){
    this.router.navigate(["personal"],{relativeTo:this.routeactivate})
  }


}
