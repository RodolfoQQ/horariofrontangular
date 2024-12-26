import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { ServiciosService } from '../../servicio/servicios.service';
import { Puesto } from '../models/Puesto';

@Component({
  selector: 'app-puestospat',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './puestospat.component.html',
  styleUrl: './puestospat.component.css'
})

export class PuestospatComponent {
cabe!:number;
cabepuesto!:number;
puestos:Puesto[]=[];

constructor(private service:ServiciosService, private dialog:MatDialog,
  @Inject(MAT_DIALOG_DATA) public data:{idpuesto:number,idcabe:number}
){}
  ngOnInit(): void {
    this.cabe=this.data.idpuesto;
    this.cabepuesto=this.data.idcabe;
    console.log("id puesto  recibido"+this.data.idpuesto)
    this.listapuestos();
  }

  listapuestos(){
    console.log("datos de peustos"+this.puestos)
    this.service.puestospatrulleros().subscribe(data=>{
      this.puestos=data
    }
    )
    console.log("datos de peustos"+this.puestos)
  }

  cambiarpuestopatrullaje(cabepuesto:number,idpuesto:number){
    this.service.updatepuestoencabe(idpuesto,cabepuesto).subscribe(()=>{
      console.log("actualizado")
      this.dialog.closeAll();
    })

  }

}
