import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from '../../material/material.module';
import { PnpService } from '../../servicio/pnp.service';
import { ServiciosService } from '../../servicio/servicios.service';
import { EfectivosdisponiblesComponent } from '../efectivosdisponibles/efectivosdisponibles.component';
import { Cabecerapuesto } from '../models/Cabecerapuesto';
import { Dtomobiles } from '../models/Dtos/Dtomobiles';
import { Dtopnp } from '../models/Dtos/Dtopnp';
import { Pnp } from '../models/Pnp';
import { PuestospatComponent } from '../puestospat/puestospat.component';
import { ConfirmareliminarcabeceraComponent } from '../shared/confirmareliminarcabecera/confirmareliminarcabecera.component';
import { DialogsComponent } from '../shared/dialogs/dialogs.component';
import { UummdisponiblesComponent } from '../uummdisponibles/uummdisponibles.component';


@Component({
  selector: 'app-serviciospatrulleros',
  standalone: true,
  imports: [MaterialModule, EfectivosdisponiblesComponent, NgClass,DialogsComponent],
  templateUrl: './serviciospatrulleros.component.html',
  styleUrl: './serviciospatrulleros.component.css'
})

export class ServiciospatrullerosComponent {
  peloton!:any;
  listadetalle: Cabecerapuesto[]=[];
  efectivosdisponiblesdata:Dtopnp[]=[]
  listpnp:Pnp[]=[]
  dtomobilesdisponibles:Dtomobiles[]=[]
  cabecera!:Cabecerapuesto
  pnpsfiltradossinparametros!:Dtopnp[]

  //variable para validar sss
  listapnpcabe_area!:Pnp[]
  habilitabooneliminartodoslospnp:boolean=false

  //@ViewChild(DialogsComponent) dialigchild!:DialogsComponent;
  constructor(private servicedetalle:ServiciosService, private dialog:MatDialog, private servicepnp:PnpService){}

  ngOnInit(): void {
    this.dtopnpsinparametros()
    this.mobilesdisponibles();
  }

  dataefectivosdisponibles(){
    this.servicedetalle.pnpdisponiblesporpeloton(this.peloton).subscribe(data=>{
       this.efectivosdisponiblesdata=data

    })
  }

  dtopnpsinparametros(){
    this.servicepnp.dtopnpsinparametros().subscribe(
      data=>{
        this.pnpsfiltradossinparametros=data
      }
    )
  }


  openDialog(idcabe:Cabecerapuesto) {
    const idcae =idcabe.idcabecerapuesto
    let area=this.peloton
    if(area=="alfa"){
      area=1
    }
    if(area=="beta"){
      area=2
    }
    if(area=="gama"){
      area=3
    }
    //evaluar si  hay pnps que conicidad con el peloton
    this.servicepnp.list_pnpporpelotonyarea(idcae,area).subscribe(data=>{
        this.listapnpcabe_area=data
        if (this.listapnpcabe_area.length) {
          console.log("existe datos---> ");
          this.habilitabooneliminartodoslospnp = true;
          //si existen datos abre el dialog
          this.abrirdialogsiexisteonoelboton(idcabe)

      }else{
          console.log("no existe datos--->");
          this.habilitabooneliminartodoslospnp = false;
         this.confirmareliminartodalacabcera(idcabe.idcabecerapuesto)
      }
    })
  }

  abrirdialogsiexisteonoelboton(idcabe:Cabecerapuesto){
    const dialogred= this.dialog.open(DialogsComponent, {
      data:{idcabe:idcabe,
            peloton:this.peloton
      }
    })
      dialogred.afterClosed().subscribe(()=>{
      this.dataefectivosdisponibles();
      this.listadetallepeusto()
      this.habilitabooneliminartodoslospnp = false;

    })
  }
  confirmareliminartodalacabcera(idcabe:number){
   const dialig= this.dialog.open(ConfirmareliminarcabeceraComponent,{
      data:{
        idcabe:idcabe
      }
    })
    dialig.afterClosed().subscribe(()=>{
      this.dataefectivosdisponibles();
      this.listadetallepeusto()

    })

    console.log(" id para eliminar toda la cabecera =>"+idcabe)
  }



  efectivosdisponibles(idcabecerapuesto:number){
   const dialogref=this.dialog.open(EfectivosdisponiblesComponent,{
      data:{idcabe:idcabecerapuesto,
            efecdispo:this.efectivosdisponiblesdata
      }
    })
          dialogref.afterClosed().subscribe(()=>{
            this.dataefectivosdisponibles();
            this.listadetallepeusto()
    })
  }

  pnppeltoncabe(){
      this.servicedetalle.listapnpporidcabypeloton(this.peloton, 2).subscribe(data=>{
        this.listpnp=data
        console.log('lista cabe  peloton'+this.listpnp)
      })
  }

  getpeloto(){
      this.listadetallepeusto()
      this.dataefectivosdisponibles();
    }


    quitarpnpdecabecera(cip: string) {
    this.servicedetalle.quitarpnpencabecera(cip).subscribe(() => {
      this.listadetalle = this.listadetalle.map(data => {
        // Filtra los efectivos que no coinciden con el cip que quieres quitar
        data.efectivos = data.efectivos.filter(efectivo => efectivo.cip !== cip);
        this.dataefectivosdisponibles()
        return data; // Regresa el objeto `data` actualizado
      });
    });
  }


  listadetallepeusto(){
    const selectelemt=document.getElementById('peloton')as HTMLSelectElement
    this.peloton=selectelemt.value
    this.servicedetalle.listarserviciospatrullero(this.peloton).subscribe(data=>{
    this.listadetalle=data
    }
    )
  }

  mobilesdisponibles(){
    this.servicedetalle.uummdisponibles().subscribe(data=>{
      this.dtomobilesdisponibles=data
    })
  }


  abrirdialogmobilesdisponibles(idcabecera:number, idmobil:number,descmobil:string){
   const dialog= this.dialog.open(UummdisponiblesComponent,{
      data:{
        idcabe:idcabecera,//envia solo el idcabecera
        idmobil:idmobil,// envia solo el id mobil
        descmobil:descmobil,//
        mobiles:this.dtomobilesdisponibles// envia todo el array de mobiles
      }
    })
    dialog.afterClosed().subscribe(()=>{
      this.dataefectivosdisponibles();
      this.listadetallepeusto()
      this.mobilesdisponibles()
    })
  }


   abrirdialogsinvparametros(idcabecera:number){
    console.log("id cabecera"+idcabecera)
    const dialog= this.dialog.open(UummdisponiblesComponent,{
      data:{
        idcabe:idcabecera,
        mobiles:this.dtomobilesdisponibles
      }
    })
      dialog.afterClosed().subscribe(()=>{
      this.dataefectivosdisponibles();
      this.listadetallepeusto();
      this.mobilesdisponibles();
    })
  }

  abrirdialogpuestosinasignar(idcabe:number){
    const dialog=this.dialog.open(PuestospatComponent,{
      data:{
        idcabe:idcabe
      }
    })
    dialog.afterClosed().subscribe(()=>{
      this.dataefectivosdisponibles();
      this.listadetallepeusto();
      this.mobilesdisponibles();
    })
  }

  abrirdialogpuestopat(idpuesto:number, idcabe:number){
    console.log("puesto id enviado "+idpuesto)
    const dialog= this.dialog.open(PuestospatComponent,{
      data:{
        idpuesto:idpuesto,
        idcabe:idcabe
        }
    })
    dialog.afterClosed().subscribe(()=>{
      this.dataefectivosdisponibles();
      this.listadetallepeusto();
      this.mobilesdisponibles();
    })
  }

  anadircabecera(){
    this.servicedetalle.anadirpuesto(this.cabecera).subscribe(()=>{
      this.listadetallepeusto();
      this.mobilesdisponibles();
      console.log("se añadiro nuevo")

    })

  }




}
