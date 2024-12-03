import { Areatrabajo } from "./Areatrabajo";
import { Cargo } from "./Cargo";
import { Estado } from "./Estado";
import { Grado } from "./Grado";

export interface Pnp{

     idpnp?:number

     cip:string

     grado:Grado

    nombre:string

    apellido:string

    estadopnp:Estado

    cargo:Cargo

    areatrabajo: Areatrabajo;
}
