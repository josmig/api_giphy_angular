import { GifsService } from './../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{


  constructor(private _gifsService: GifsService){}


  //Para manejar el DOM practicamente
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  buscar(){
    /* console.log(event.key); */
    /* console.log(termino); */
    const valor = this.txtBuscar.nativeElement.value;
    /* console.log(valor); */
    this._gifsService.buscarGifs( valor );
    
    this.txtBuscar.nativeElement.value= '';
    
    
  }

}
