import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private _historial: string[] = [];

  get historial(){    
    return [...this._historial];
    
  }
  buscarGifs( query: string){

    query = query.trim().toLocaleLowerCase();
    //si no lo incluye
    if(!this._historial.includes( query)){
      // lo inserto
      this._historial.unshift( query );
    }
    //limitando la cantidad de info en el historial
    this._historial =this._historial.splice(0,10);
    console.log(this._historial);
    
  }


}
