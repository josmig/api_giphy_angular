import { GifsService } from './../../gifs/services/gifs.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'  
})
export class SidebarComponent {

  constructor(private _gifsService: GifsService){}
  
  get historial(){
    return this._gifsService.historial;
  }

  buscar( termino: string ){
    this._gifsService.buscarGifs( termino );
    console.log(termino);
    
  }
  


}
