import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';

import { Amenity } from '../../../app/models/amenity.model';
import { AmenitiesService } from '../amenities.service';

@Component({
  selector: 'turnosAmenity',
  templateUrl: 'turnosAmenity.html'
})

export class TurnosAmenityPage {

  private amenity: Amenity;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public AmenitiesService: AmenitiesService) {
    this.amenity = navParams.get("amenity");

  }

  dismiss() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
  }

}