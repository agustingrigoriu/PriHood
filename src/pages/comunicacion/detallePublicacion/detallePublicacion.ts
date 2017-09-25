import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Comentario } from '../../../app/models/comentario.model';
import { ComunicacionService } from '../comunicacion.service';

@Component({
  selector: 'detallePublicacion',
  templateUrl: 'detallePublicacion.html'
})

export class DetallePublicacionPage {

  public publicacion;
  public comentarios: Comentario[];
  private comentario: Comentario = {
    comentario: '',
    fecha: new Date()
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ComunicacionService: ComunicacionService,
    public proveedor: NavParams) {
    this.publicacion = navParams.get("publicacion");
  }

  volver() {
    this.navCtrl.pop();
  }

  comentar(comentario: Comentario) {
    //
  }

  actualizar() {
    this.ComunicacionService.getComentarios(this.publicacion.id).then(response => {
      if (response.error) {
        alert('No se lograron obtener publicaciones');
      } else {
        this.comentarios = response.data;
      }
    });
  }

  ionViewWillEnter() {
    this.actualizar();
  }



}