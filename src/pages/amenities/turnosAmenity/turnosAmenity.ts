import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import * as moment from 'moment';

import { AmenitiesPage } from '../amenities';
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
  private turnos;
  private defaultDate = new Date(2017, 1, 6);

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public AmenitiesService: AmenitiesService,
    public loadingController: LoadingController) {
    this.amenity = navParams.get("amenity");
    this.fecha = navParams.get("fecha");
  }

  async getTurnosAmenity() {
    try {
      const loading = this.loadingController.create();
      loading.present();
      const response = await this.AmenitiesService.getTurnosAmenity(this.amenity.id, this.fecha);
      if (response.error) throw 'error';
      this.turnos = response.data.turnos.map(this.horarioTurno.bind(this));
      loading.dismiss();
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

  horarioTurno(turno: Turno) {
    const [hours, minutes] = turno.horaDesde.split(':');

    const start = moment(this.defaultDate).clone().add(+hours, 'hours').add(+minutes, 'minutes');
    const end = start.clone().add(turno.duracion, 'minutes');

    return {
      ...turno,
      horario_comienza: start.format('HH:mm'),
      horario_fin: end.format('HH:mm')
    };
  }

  ionViewWillEnter() {
    this.getTurnosAmenity();
  }

  onSelectTurno(turnoSeleccionado) {
    this.turnoSeleccionado = turnoSeleccionado;
    if (!turnoSeleccionado.reservado) {
      this.confirmarReserva();
    } else {
      const alertMessage = this.alertCtrl.create({
        title: 'Turno no disponible',
        message: 'Este turno no se encuentra disponible',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  confirmarReserva() {
    const ts = this.horarioTurno(this.turnoSeleccionado);
    const confirm = this.alertCtrl.create({
      title: '¿Reservar este turno?',
      message: this.amenity.nombre + '<br>' + ts.horario_comienza + ' - ' + ts.horario_fin,
      buttons: [
        {
          text: 'Cancelar',
        },
        {
          text: 'Reservar',
          handler: () => {
            this.reservarTurno(this.fecha);
          }
        }
      ]
    });
    confirm.present();
  }

  reservarTurno(fecha) {
    const reserva = {
      fecha,
      observaciones: ''
    };
    const loading = this.loadingController.create();
    loading.present();
    this.AmenitiesService.reservarTurno(this.turnoSeleccionado.id, reserva).then(response => {
      if (response.error) {
        this.presentToast('No se pudo registrar la reserva.');
      } else {
        this.presentToast('Su turno fué reservado correctamente.');
        this.navCtrl.setRoot(AmenitiesPage);
      }
      loading.dismiss();
    })
  }

  presentToast(message: string) {
    const toast = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }

}