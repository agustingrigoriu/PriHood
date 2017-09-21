import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { AmenitiesService } from '../amenities.service';

import { MiReserva } from '../../../app/models/miReserva.model';

@Component({
  selector: 'misReservas',
  templateUrl: 'misReservas.html'

})
export class MisReservasPage {

  reservas: any[] = [];
  loading: boolean;
  private defaultDate = new Date(2017, 1, 6);


  constructor(public AmenitiesService: AmenitiesService,
    public alertCtrl: AlertController, ) {
  }

  ionViewWillEnter() {
    this.actualizar();
  }

  actualizar() {
    this.loading = true;
    this.AmenitiesService.getReservas().then(response => {
      if (response.error) {
        const alertMessage = this.alertCtrl.create({
          title: 'Sin conexión',
          message: 'No se pudo obtener ninguna reserva',
          buttons: ['Ok']
        });
        alertMessage.present();
      } else {
        this.reservas = response.data.map(this.horarioTurno.bind(this));
        this.loading = false;
      }
    });
  }

  noHayReservas() {
    return (!this.loading && this.reservas.length === 0);
  }

  horarioTurno(miReserva: MiReserva): MiReserva {
    const { turno } = miReserva;
    const [hours, minutes] = turno.horaDesde.split(':');

    const start = moment(this.defaultDate).clone().add(+hours, 'hours').add(+minutes, 'minutes');
    const end = start.clone().add(turno.duracion, 'minutes');

    return {
      ...miReserva,
      turno: {
        ...turno,
        horario_comienza: start.format('HH:mm'),
        horario_fin: end.format('HH:mm')
      }
    };
  }

}