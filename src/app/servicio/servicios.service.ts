import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Cabecerapuesto } from '../dashboar/models/Cabecerapuesto';
import { Dtomobiles } from '../dashboar/models/Dtos/Dtomobiles';
import { Dtopnp } from '../dashboar/models/Dtos/Dtopnp';
import { Pnp } from '../dashboar/models/Pnp';
import { Puesto } from '../dashboar/models/Puesto';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  url:string="https://143.110.147.193:8080/api/"

  constructor(private http:HttpClient){}

  listarserviciospatrullero(peloton:string): Observable<Cabecerapuesto[]> {
    return this.http.get<{mensaje:Cabecerapuesto[]}>(`${this.url}cabecera/${peloton}`).pipe(
      map(response => response.mensaje)  // Extrae el arreglo del campo "mensaje"
    );
  }

  updatemobilencabecera(idunidadmobil:number,idcabecerapuesto:number):Observable<string>{
    return this.http.put<{mensaje:string}>(`${this.url}updatemobilencabe/${idunidadmobil}/${idcabecerapuesto}`,null).pipe(
      map(response=>response.mensaje)
    )
  }

  eliminarcabecera(idcabecera:number):Observable<{mensaje:string}>{
    return this.http.delete<{mensaje:string}>(`${this.url}eliminarcabecera/${idcabecera}`).pipe(
      tap(response => console.log('Respuesta recibida:', response)),

      //map(response=>response.mensaje)
    )

  }

  pnpdisponiblesporpeloton(peloton:string):Observable<Dtopnp[]>{
    return  /*of(MockDtPnp)*/ this.http.get<Dtopnp[]>(`${this.url}dtopnp/${peloton}`)
  }

  addpnpacabecera(idcab:number,cip:string):Observable<Pnp>{
    return this.http.put<Pnp>(`${this.url}adpnpacabezera/${idcab}/${cip}`,null)
  }

  quitarpnpencabecera(cip:string):Observable<Pnp>{
    return this.http.put<Pnp>(`${this.url}quitarpnp/${cip}`,null)
  }
//lala
  listapnpporidcabypeloton(peloton:string,cabecera:number):Observable<Pnp[]>{
    return this.http.get<Pnp[]>(`${this.url}pnppeltoncabe/${peloton}/${cabecera}`)
  }

  uummdisponibles():Observable<Dtomobiles[]>{
    return  /*of(MockDtoMobiles) */ this.http.get<Dtomobiles[]>(`${this.url}patrullerosdiponibles`)
  }


  updatemobilDisponible(mobil:string):Observable<void>{
    return this.http.put<void>(`${this.url}updatemobilDisponible/${mobil}`,null)
  }

  updatepuestoencabe(idnuevopuesto:number,idcabe:number):Observable<string>{
    return this.http.put<{mensaje:string}>(`${this.url}updatepuestoencabe/${idnuevopuesto}/${idcabe}`,null).pipe(map(
      response=>response.mensaje
    ))
  }

  puestospatrulleros():Observable<Puesto[]>{
    return /*of(DataPuesto)*/ this.http.get<Puesto[]>(`${this.url}puestospatrulleros`)
  }

  anadirpuesto(cabe:Cabecerapuesto):Observable<Cabecerapuesto>{
    return this.http.post<Cabecerapuesto>(`${this.url}anadircabecera`,cabe)
  }

  eliminarefectivosdecabecera(idcabe:number, idarea:number):Observable<void>{
    return this.http.put<void>(`${this.url}eliminarefectivosdecabecera/${idcabe}/${idarea}`,null)
  }


}
