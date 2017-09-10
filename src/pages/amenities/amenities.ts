import { Component, ViewChild } from '@angular/core';
import { AmenitiesService } from './amenities.service';
import { NavController, AlertController, App } from 'ionic-angular';
import { Amenity } from '../../app/models/amenity.model';
import { ListaAmenitiesPage } from './listaAmenities/listaAmenities';

@Component({
  templateUrl: 'amenities.html'

})
export class AmenitiesPage {

  private tipos_amenities: any[] = [];

  constructor(private AmenitiesService: AmenitiesService,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {
  }

  async getTiposAmenities() {
    try {
      const response = await this.AmenitiesService.getTiposAmenities();
      if (response.error) throw 'error';
      this.tipos_amenities = response.data;
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Sin conexión',
        message: 'No se pudo obtener los amenities',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  openAmenitiesListPage(tipoAmenity: Amenity) {
    this.navCtrl.push(ListaAmenitiesPage, {
      tipo_amenity: tipoAmenity
    });;
  }

  noHayAmenities() {
    return (this.tipos_amenities.length === 0);
  }

  ionViewWillEnter() {
    this.getTiposAmenities();
  }

}