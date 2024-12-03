import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';
import { ServiciosService } from '../../../servicio/servicios.service';

@Component({
  selector: 'app-confirmareliminarcabecera',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirmareliminarcabecera.component.html',
  styleUrl: './confirmareliminarcabecera.component.css'
})
export class ConfirmareliminarcabeceraComponent {
  mostrarexito=false
  constructor(private servicedetalle:ServiciosService, private dialog:MatDialog ,@Inject (MAT_DIALOG_DATA) public data:{idcabe:number} ){}


  eliminarcabecera(){
    console.log("la id cabecera a eliminar es  "+this.data.idcabe)
    this.servicedetalle.eliminarcabecera(this.data.idcabe).subscribe(()=>{
      this.mostrarexito=true
    })

  }
  cancelar(){
    this.dialog.closeAll()
  }


}
