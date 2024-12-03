import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { ServiciosService } from '../../servicio/servicios.service';
import { Dtomobiles } from '../models/Dtos/Dtomobiles';

@Component({
  selector: 'app-uummdisponibles',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './uummdisponibles.component.html',
  styleUrl: './uummdisponibles.component.css'
})
export class UummdisponiblesComponent {
  dtomobiles:Dtomobiles[]=[];
  idcabe!:number;
  textocambiad:Set<number>=new Set()


constructor(private service:ServiciosService,@Inject(MAT_DIALOG_DATA) public data:{mobiles:Dtomobiles[],idcabe:number, idmobil:number, descmobil:string }){}
ngOnInit(): void {
  this.listamobilesdisponobles()
  console.log("id recepcionado de mobil a cambiar:-->" +this.data.descmobil)

}

listamobilesdisponobles(){
  this.idcabe=this.data.idcabe
  this.dtomobiles=this.data.mobiles
}

updatemobilencabecera(idmobil:number){
  this.idcabe=this.data.idcabe
  this.service.updatemobilencabecera(idmobil,this.idcabe).subscribe(()=>{
      this.marcarcambio(idmobil)
    this.updatemobilDisponible();

  })
}

marcarcambio(idmobil:number){
  this.textocambiad.add(idmobil);
  setTimeout(() => {
    this.textocambiad.delete(idmobil)
  }, 200);
}

updatemobilDisponible(){
  if(this.data.descmobil===null){
    console.log("no se actulizo nada por baboso")
  }else{
    this.service.updatemobilDisponible(this.data.descmobil).subscribe(
      ()=>{

      }
    )
  }
}

}
