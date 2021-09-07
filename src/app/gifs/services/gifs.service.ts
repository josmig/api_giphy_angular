import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key: string = 'n0MCAVNSMzWUnGH8lQzT1T0t2IpmDxnr';
  private _historial: string[] = [];
  
  //TODO: Cambiar any por su tipo
  public resultados:any [] = [];

  get historial(){    
    return [...this._historial];
    
  }

  constructor(private http: HttpClient){}


  buscarGifs( query: string){

    query = query.trim().toLocaleLowerCase();
    //si no lo incluye
    if(!this._historial.includes( query)){
      // lo inserto
      this._historial.unshift( query );
      //limitando la cantidad de info en el historial
      this._historial =this._historial.splice(0,10);
    }
    
      //Forma de consumir en vez del fechAPI poque cuando ocurre un error tendriamos que hacer un monton de cosas mas
     this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=n0MCAVNSMzWUnGH8lQzT1T0t2IpmDxnr&q=${query}&limit=10`)
      .subscribe( (respuesta:any) => {       
        console.log( respuesta.data );
        this.resultados = respuesta.data;
      });

  }

  

}
