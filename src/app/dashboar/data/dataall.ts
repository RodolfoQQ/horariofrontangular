import { Areatrabajo } from "../models/Areatrabajo";
import { Cabecerapuesto } from "../models/Cabecerapuesto";
import { Cargo } from "../models/Cargo";
import { Categoria } from "../models/Categoria";
import { Dtomobiles } from "../models/Dtos/Dtomobiles";
import { Dtopnp } from "../models/Dtos/Dtopnp";
import { Estado } from "../models/Estado";
import { Grado } from "../models/Grado";
import { Pnp } from "../models/Pnp";
import { Unidadmobil } from "../models/Unidadmobil";
import { DataPuesto } from "./MockPuestodata";

export const Mockcargo:Cargo[]=[
  {
    idcargo:1,
    nombrecargo:'operador'

  },
  {
    idcargo:2,
    nombrecargo:'conductor'
  }
]
export const MockGrado:Grado[]=[
  {
    idgrado:1,
    nombregrado:'S3'
  },
  {
    idgrado:2,
    nombregrado:'S2'
  }, {
    idgrado:3,
    nombregrado:'S1'
  }, {
    idgrado:4,
    nombregrado:'ST3'
  }, {
    idgrado:5,
    nombregrado:'ST2'
  },
]

export const MockDtoMobiles:Dtomobiles[]=[
  {idunidadmobil:1,
    descripcion:'Pl 1951',
    nombreestado:'disponible',
  },
  {idunidadmobil:2,
    descripcion:'Pl 1952',
    nombreestado:'disponible',
  },
  {idunidadmobil:3,
    descripcion:'Pl 1953',
    nombreestado:'disponible',
  },
  {idunidadmobil:4,
    descripcion:'Pl 1954',
    nombreestado:'disponible',
  },{idunidadmobil:5,
    descripcion:'Pl 1955',
    nombreestado:'disponible',
  }

]

export const MockCategoria:Categoria[]=[
  {idcategoria:1,
    nombrecategoria:'moto',
    descripcioncategoria:'sn'
  },

  {idcategoria:2,
    nombrecategoria:'camioneta',
    descripcioncategoria:'sn'
  },

]
export const MockMobiles:Unidadmobil[]=[
  {
    idunidadmobil:1,
    descripcion:'PL 19551',
    categoriamobil:MockCategoria[2]
  },
  {
    idunidadmobil:2,
    descripcion:'PL 19552',
    categoriamobil:MockCategoria[2]
  },
  {
    idunidadmobil:3,
    descripcion:'PL 19553',
    categoriamobil:MockCategoria[2]
  },
  {
    idunidadmobil:4,
    descripcion:'PL 19554',
    categoriamobil:MockCategoria[2]
  },
  {
    idunidadmobil:5,
    descripcion:'PL 19555',
    categoriamobil:MockCategoria[2]
  },
  {
    idunidadmobil:6,
    descripcion:'PL 19556',
    categoriamobil:MockCategoria[2]
  },
  {
    idunidadmobil:7,
    descripcion:'PL 19557',
    categoriamobil:MockCategoria[2]
  },
  {
    idunidadmobil:8,
    descripcion:'PL 19558',
    categoriamobil:MockCategoria[2]
  },

]

export const MockEstado:Estado[]=[
{
  idestado:1,
  nombreestado:'disponible pnp'
},
{
  idestado:2,
  nombreestado:'franco'
},
{
  idestado:3,
  nombreestado:'ocupado'
},
{
  idestado:4,
  nombreestado:'uumm ocupada'
},{
  idestado:5,
  nombreestado:'uumm disponible'
}
]

export const MockAreatrabajo:Areatrabajo[]=[
  {idareatrabajo:1,
    descripcion:'alfa'
  },
  {idareatrabajo:2,
    descripcion:'beta'
  },
  {idareatrabajo:3,
    descripcion:'gama'
  }
]

export const MockCEfectivo:Pnp[]=[
  {
    idpnp:1,
    cip:'12345',
    grado:MockGrado[2],
    nombre:'lol',
    apellido:'lopez',
    estadopnp:MockEstado[1],
    cargo:Mockcargo[1],
    areatrabajo:MockAreatrabajo[1]
  }

]

export  const MockDtPnp:Dtopnp[]=[
  {
    nombregrado:'S3',
    apellido:'string',
    nombre:'rodolfo',
    nombrecargo:'operador',
    peloton:'alfa',
    cip:'31941081'
  },
  {
    nombregrado:'S3',
    apellido:'string',
    nombre:'matilde',
    nombrecargo:'operador',
    peloton:'alfa',
    cip:'31941082'
  },
  {
    nombregrado:'S3',
    apellido:'string',
    nombre:'pepito',
    nombrecargo:'operador',
    peloton:'alfa',
    cip:'31941084'
  },
  {
    nombregrado:'S3',
    apellido:'string',
    nombre:'tontin',
    nombrecargo:'operador',
    peloton:'alfa',
    cip:'31941086'
  },{
    nombregrado:'S3',
    apellido:'string',
    nombre:'lucas',
    nombrecargo:'operador',
    peloton:'alfa',
    cip:'31941088'
  },{
    nombregrado:'S3',
    apellido:'string',
    nombre:'jrafales',
    nombrecargo:'operador',
    peloton:'beta',
    cip:'31941089'
  }

]

export const MockCabeceraPuesto:Cabecerapuesto[]=[
  {
    idcabecerapuesto:1,
    efectivos:[MockCEfectivo[1],MockCEfectivo[2]],
    mobil:[MockMobiles[1]],
    puesto:[DataPuesto[1]]
  }
]
