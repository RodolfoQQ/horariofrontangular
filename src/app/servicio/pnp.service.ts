import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Areatrabajo } from '../dashboar/models/Areatrabajo';
import { Cargo } from '../dashboar/models/Cargo';
import { Dtopnp } from '../dashboar/models/Dtos/Dtopnp';
import { Dtopnpsaved } from '../dashboar/models/Dtos/Dtopnpsaved';
import { Estado } from '../dashboar/models/Estado';
import { Grado } from '../dashboar/models/Grado';
import { Pnp } from '../dashboar/models/Pnp';

@Injectable({
  providedIn: 'root'
})
export class PnpService {

  //url:string="http://143.110.147.193:8080/pnp/"

   url: string = "https://horario.developer-rod.com/pnp/";


  constructor(private http:HttpClient) { }
 listapnpdtoporpeloton(peloton:string):Observable<Dtopnp[]>{
    return this.http.get<Dtopnp[]>(`${this.url}listaporpeloton/${peloton}`)
  }
  listarcargos():Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${this.url}cargolista`)
  }

  listagrados():Observable<Grado[]>{
    return this.http.get<Grado[]>(`${this.url}grados`)
  }

  listaareatrabajo():Observable<Areatrabajo[]>{
    return this.http.get<Areatrabajo[]>(`${this.url}areatrabajo`)
  }

  listaeatdos():Observable<Estado[]>{
    return this.http.get<Estado[]>(`${this.url}estadospersona`)
  }

  savepnp(pnp:Pnp):Observable<Dtopnpsaved>{
    return this.http.post<Dtopnpsaved>(`${this.url}savepnp`,pnp).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Ha ocurrido un error:', error);
    return throwError('Algo salió mal; por favor, intenta nuevamente más tarde.');
  }

  updatePnp(cip:string,dtopnpsaved:Dtopnpsaved):Observable<Dtopnpsaved>{
    return this.http.put<Dtopnpsaved>(`${this.url}actualizarpnp/${cip}`,dtopnpsaved)
  }

  list_pnpporpelotonyarea (idcabe:number,area:number):Observable<Pnp[]>{
    return this.http.get<Pnp[]>(`${this.url}pnpporpelotonyarea/${idcabe}/${area}`)
  }

  dtopnpsinparametros():Observable<Dtopnp[]>{
      return this.http.get<Dtopnp[]>(`${this.url}dtopnpsinparametros`)
  }





}
