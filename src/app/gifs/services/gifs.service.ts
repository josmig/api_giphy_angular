import { SearchGifsResponse, Gif } from './../interfaces/gifs.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private api_key: string = 'n0MCAVNSMzWUnGH8lQzT1T0t2IpmDxnr';
  private _historial: string[] = [];
  
  //TODO: Cambiar any por su tipo Interface
  public resultados: Gif[] = [];

  get historial(){    
    return [...this._historial];
    
  }

  constructor(private http: HttpClient){
    //cargar el localstorage | Historial
    this._historial = JSON.parse(localStorage.getItem('historial')! )||[];
    /* if( localStorage.getItem('historial')){
      this._historial = JSON.parse( localStorage.getItem('historial')!);
    } */
  }


  buscarGifs( query: string){

    query = query.trim().toLocaleLowerCase();
    //si no lo incluye
    if(!this._historial.includes( query)){
      // lo inserto
      this._historial.unshift( query );
      //limitando la cantidad de info en el historial
      this._historial =this._historial.splice(0,10);

      //Localstorage | Utilizamos el JSOn para pasar a string cualquier tipo de dato
      localStorage.setItem('historial',JSON.stringify(this._historial));
      //con esto se guarda en el localstorage
    }
    
      //Forma de consumir en vez del fechAPI poque cuando ocurre un error tendriamos que hacer un monton de cosas mas
     this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=n0MCAVNSMzWUnGH8lQzT1T0t2IpmDxnr&q=${query}&limit=10`)
      .subscribe( (respuesta) => {       
        console.log( respuesta.data );
        this.resultados = respuesta.data;
      });

  }


  
  

}
