import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import * as moment from 'moment';

import { Amenity } from '../../../app/models/amenity.model';
import { Turno } from '../../../app/models/turno.model';
import { AmenitiesService } from '../amenities.service';

@Component({
  selector: 'turnosAmenity',
  templateUrl: 'turnosAmenity.html'
})

export class TurnosAmenityPage {

  private amenity: Amenity;
  private fecha: any;
  private turnoSeleccionado: Turno;
  private turnos: Turno[];
  private defaultDate = new Date(2017, 1, 6);

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public AmenitiesService: AmenitiesService) {
    this.amenity = navParams.get("amenity");
    this.fecha = navParams.get("fecha");
  }

  //solo a modo de prueba hasta definir modo de manejo de visualizacion de disponibilidad
  turnoDisponible() {
    return true;
  }

  async getTurnosAmenity() {
    try {
      const response = await this.AmenitiesService.getTurnosAmenity(this.amenity.id, this.fecha);
      if (response.error) throw 'error';
      this.turnos = response.data.turnos;
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Sin conexión',
        message: 'No se pudo obtener los turnos',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  dismiss() {
    this.navCtrl.pop();
  }

  //Reemplazar metodo, para obtener hora de finalizacion del turno
  horarioTurno(turno: Turno) {
    const [hours, minutes] = turno.horaDesde.split(':');
    const startTurno = hours.concat(':', minutes);

    //moment para sumar duracion de turno
    const start = moment(this.defaultDate).clone().add(+hours, 'hours').add(+minutes, 'minutes');
    const end = start.clone().add(turno.duracion, 'minutes');

    //ASQUEROSA MANERA DE OBTENER LA HORA DE FINALIZACION DEL TURNO - Reemplazar!
    const endHours = (end.toDate().getHours().toString());
    const endMinutes = (end.toDate().getMinutes().toString());
    const endTurno = endHours.concat(':', endMinutes);
  }

  ionViewWillEnter() {
    this.getTurnosAmenity();
  }

  onSelectTurno(turnoSeleccionado) {
    this.turnoSeleccionado = turnoSeleccionado;
  }

}