import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { ServiciosService } from '../../servicio/servicios.service';
import { Dtopnp } from '../models/Dtos/Dtopnp';


@Component({
  selector: 'app-efectivosdisponibles',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './efectivosdisponibles.component.html',
  styleUrl: './efectivosdisponibles.component.css'
})

export class EfectivosdisponiblesComponent {
  peloton:string="alfa"
  pnpdisponible:Dtopnp[]=[]

  constructor(
    private pnpservice: ServiciosService, private servicepnp:ServiciosService,
    @Inject(MAT_DIALOG_DATA) public data: {idcabe:any, efecdispo:Dtopnp[]}
  ) {}

  ngOnInit(): void {
    this.efectivosdisponiblesporpeloton();
    console.log('id recibido',this.data.idcabe)
  }

  addpnpcabecera(cip:string){
    this.servicepnp.addpnpacabecera(this.data.idcabe,cip).subscribe(()=>{
      this.pnpdisponible=this.pnpdisponible.filter(data=>data.cip != cip)

    })
  }

  efectivosdisponiblesporpeloton(){
        this.pnpdisponible=this.data.efecdispo
   }
}


