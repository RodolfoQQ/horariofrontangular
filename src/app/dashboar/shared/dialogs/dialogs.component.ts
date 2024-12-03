import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';
import { ServiciosService } from '../../../servicio/servicios.service';
import { Cabecerapuesto } from '../../models/Cabecerapuesto';

@Component({
  selector: 'app-dialogs',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialogs.component.html',
  styleUrl: './dialogs.component.css'
})

export class DialogsComponent {
  peloton!:any
  mostrarexito=false

  constructor(private servicedetalle:ServiciosService, private dialog:MatDialog,
  @Inject(MAT_DIALOG_DATA) public data:{idcabe:Cabecerapuesto,peloton:any}){}

  eliminarefectivosdecabecera(){
    const idcabe= this.data.idcabe
    let peloton= this.data.peloton
    if(peloton==="alfa"){
      peloton=1
    }
    if(peloton==="beta"){
      peloton=2
    }
    if(peloton==="gama"){
      peloton=3
    }

    this.servicedetalle.eliminarefectivosdecabecera(idcabe.idcabecerapuesto,peloton).subscribe(()=>{
      this.mostrarexito=true
      setTimeout(() => {
        this.dialog.closeAll()
      }, 1000);
    })

  }
  cancelar(){
    this.dialog.closeAll()
  }

}
