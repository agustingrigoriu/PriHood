import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Voto } from '../../../app/models/voto.model';

import { AmenitiesService } from '../amenities.service';

@Component({
  selector: 'listaAmenities',
  templateUrl: 'listaAmenities.html'
})

export class ListaAmenitiesPage {

  public tipo_amenity: any;
  public amenities: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public AmenitiesService: AmenitiesService) {
    this.tipo_amenity = navParams.get("tipo_amenity");
  }

  async getListaAmenities() {
    try {
      const response = await this.AmenitiesService.getListaAmenities(this.tipo_amenity.id);
      if (response.error) throw 'error';
      this.amenities = response.data;
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Sin conexión',
        message: 'No se pudo obtener los amenities',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  ionViewWillEnter() {
    this.getListaAmenities();
  }



}