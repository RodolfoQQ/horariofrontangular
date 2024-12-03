import { Pnp } from "./Pnp";
import { Puesto } from "./Puesto";
import { Unidadmobil } from "./Unidadmobil";

export interface Cabecerapuesto{

  idcabecerapuesto:number;

  efectivos:Array<Pnp>

  mobil:Unidadmobil

  puesto:Puesto

}
