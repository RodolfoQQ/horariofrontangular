import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { PnpService } from '../../servicio/pnp.service';
import { Areatrabajo } from '../models/Areatrabajo';
import { Cargo } from '../models/Cargo';
import { Dtopnp } from '../models/Dtos/Dtopnp';
import { Estado } from '../models/Estado';
import { Grado } from '../models/Grado';

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule,],
  templateUrl: './personal.component.html',
  styleUrl: './personal.component.css',

})
export class PersonalComponent {
  cargo!: Cargo[]
  grado!: Grado[]
  area!: Areatrabajo[]
  estado!: Estado[]
  alfa!: Dtopnp[]
  beta!: Dtopnp[]
  gama!: Dtopnp[]
  opcionvalue:boolean=false;
  postForm!: FormGroup//ReactiveFormsModule m
   panelOpenState = signal(false);
  constructor(private servicepnp: PnpService) {
  }

  ngOnInit(): void {
    this.listacargos();
    this.listaGrados();
    this.listaAreatrabajo();
    this.listaestados();
    this.postForm = this.formulario()
    this.listapnpporpeloton()
  }
  cerrarpanel(){
    this.panelOpenState = signal(false);
  }

  formulario(): FormGroup {
    return new FormGroup({
      cip: new FormControl('', Validators.required),
      idgrado: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      idestado: new FormControl('', Validators.required),
      idcargo: new FormControl('', Validators.required),
      idareatrabajo: new FormControl('', Validators.required),
    })
  }
  habilitasaveoactualizar(){
   const data= this.postForm.value
   if(data.cip!=null){
    this.opcionvalue=false
    }
  }


  actualizarpnp(item: Dtopnp) {

    this.panelOpenState.set(true);
    this.opcionvalue=true
    const cargoSeleccionado = this.cargo.find(c => c.nombrecargo === item.nombrecargo);
    const gradoSeleccionado = this.grado.find(g => g.nombregrado === item.nombregrado);
    const areatrabajoSeleccionado = this.area.find(a => a.descripcion === item.peloton);
    const estadoSeleccionado = this.estado.find(e => e.nombreestado === item.estado);
    this.postForm.patchValue({
      cip: item.cip,
      idgrado: gradoSeleccionado?.idgrado || '',
      nombre: item.nombre,
      apellido: item.apellido,
      idestado: estadoSeleccionado?.idestado || '',
      idcargo: cargoSeleccionado?.idcargo || '',
      idareatrabajo: areatrabajoSeleccionado?.idareatrabajo || ''
    });
   // this.inputcip=false
  }


actualizar(){

 const data= this.postForm.value
 const cip =this.postForm.value.cip
    this.servicepnp.updatePnp(cip,data).subscribe(() => {
      this.listapnpporpeloton();
      this.postForm.reset()
})
}

limpiarcampos(){
  this.opcionvalue=false
  this.postForm.reset();
}

  isvalid(campo: string) {
    const control = this.postForm.get(campo)
    return control && (control.touched || control.dirty) && control.invalid
  }

  isvalidsuccefull(campo: string) {
    const control = this.postForm.get(campo)
    return control && control.touched && control.valid
  }

  listacargos() {
    this.servicepnp.listarcargos().subscribe(data => {
      this.cargo = data
    })
  }

  listaGrados() {
    this.servicepnp.listagrados().subscribe(data => {
      this.grado = data
    })
  }

  listaAreatrabajo() {
    this.servicepnp.listaareatrabajo().subscribe(data => {
      this.area = data
    })
  }

  listaestados() {
    this.servicepnp.listaeatdos().subscribe(data => {
      this.estado = data
    })
  }

  guardar(){
    if(this.postForm.invalid){
        this.postForm.markAllAsTouched();
    }else{
      const data = this.postForm.value
      this.servicepnp.savepnp(data).subscribe(() => {
        this.listapnpporpeloton();
        this.postForm.reset()
      })
    }

}



  listapnpporpeloton() {
    const alfa = 'alfa';
    this.servicepnp.listapnpdtoporpeloton(alfa).subscribe(data => {
      this.alfa = data
    })
    const beta = 'beta'
    this.servicepnp.listapnpdtoporpeloton(beta).subscribe(data => {
      this.beta = data
    })
    const gama = 'gama'
    this.servicepnp.listapnpdtoporpeloton(gama).subscribe(data => {
      this.gama = data
    })

  }
}


