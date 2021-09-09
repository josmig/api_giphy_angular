import { SearchGifsResponse, Gif } from './../interfaces/gifs.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioURL: string = 'https://api.giphy.com/v1/gifs';
  private api_key: string = 'n0MCAVNSMzWUnGH8lQzT1T0t2IpmDxnr';
  private limit: number=10;
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


    //cargando los ultimos resultados(busqueda)
    this.resultados = JSON.parse(localStorage.getItem('resultados')!);
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
    
    const params = new HttpParams()
      .set('api_key',this.api_key)
      .set('limit',this.limit.toString())
      .set('q',query);
    console.log(params.toString());
    
      //Forma de consumir en vez del fechAPI poque cuando ocurre un error tendriamos que hacer un monton de cosas mas
      /* https://api.giphy.com/v1/gifs/search?api_key=${this.api_key}&q=${query}&limit=10` */
      //forma simplificada del serivicio url
     this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`,{ params })
      .subscribe( (respuesta) => {       
        /* console.log( respuesta.data ); */
        this.resultados = respuesta.data;
        //Guardando los resultados para cuando se refresque la aplicación se pueda ver lo ultimo buscado
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });

  }


  
  

}
