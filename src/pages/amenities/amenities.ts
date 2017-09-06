import { Component } from '@angular/core';
import { AmenitiesService } from './amenities.service';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'amenities.html'

})
export class AmenitiesPage {

  private tipos_amenities: any[] = [];

  constructor(private AmenitiesService: AmenitiesService, public alertCtrl: AlertController) {
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

  ionViewWillEnter() {
    this.getTiposAmenities();
  }

}