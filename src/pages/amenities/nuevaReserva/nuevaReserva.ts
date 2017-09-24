import { Component, ViewChild } from '@angular/core';
import { AmenitiesService } from '../amenities.service';
import { NavController, AlertController, App } from 'ionic-angular';
import { TipoAmenity } from '../../../app/models/tipoAmenity.model';
import { ListaAmenitiesPage } from '../listaAmenities/listaAmenities';

@Component({
  selector: 'nuevaReserva',
  templateUrl: 'nuevaReserva.html'

})
export class NuevaReservaPage {

  private tipos_amenities: any[] = [];

  constructor(private AmenitiesService: AmenitiesService,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public app: App) {
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

  openAmenitiesListPage(tipoAmenity: TipoAmenity) {
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