import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Publicacion } from '../../app/models/publicacion.model';
import { ComunicacionService } from './comunicacion.service';
import { DetallePublicacionPage } from './detallePublicacion/detallePublicacion';
@Component({
  selector: 'comunicacion',
  templateUrl: 'comunicacion.html'

})
export class ComunicacionPage {

  private publicaciones: Publicacion[];
  private publicacionSeleccionada: Publicacion;

  constructor(private ComunicacionService: ComunicacionService, public navCtrl: NavController) { }

  actualizar() {
    this.ComunicacionService.getPublicaciones().then(response => {
      if (response.error) {
        alert('No se lograron obtener publicaciones');
      } else {
        this.publicaciones = response.data;
      }
    });
  }

  detallesPublicacion(publicacionSeleccionada: Publicacion){
    this.publicacionSeleccionada = publicacionSeleccionada;
    this.navCtrl.push(DetallePublicacionPage, {
      publicacion: this.publicacionSeleccionada
    });;
  }
  
  ionViewWillEnter() {
    this.actualizar();
  }

}