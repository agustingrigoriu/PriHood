import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Amenity } from '../../../app/models/amenity.model';

import { TurnosAmenityPage } from '../turnosAmenity/turnosAmenity'
import { AmenitiesService } from '../amenities.service';

@Component({
  selector: 'listaAmenities',
  templateUrl: 'listaAmenities.html'
})

export class ListaAmenitiesPage {

  public tipo_amenity: any;
  public amenities: any[];
  public amenitySeleccionado: any;
  public fecha = new Date().toISOString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public AmenitiesService: AmenitiesService) {
    this.tipo_amenity = navParams.get("tipo_amenity");
  }

  async getListaAmenities() {
    try {
      const response = await this.AmenitiesService.getListaAmenities(this.tipo_amenity.id, this.fecha);
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

  fechaSeleccionada(fecha) {
    this.getListaAmenities();
  }

  onSelectAmenity(amenitySeleccionado: Amenity) {
    this.amenitySeleccionado = amenitySeleccionado;
    this.pageTurnosAmenity(amenitySeleccionado);
  }

  pageTurnosAmenity(amenity: Amenity) {
    this.navCtrl.push(TurnosAmenityPage, {
      amenity: amenity,
      fecha: this.fecha
    });;
  }

  volver() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.getListaAmenities();
  }



}