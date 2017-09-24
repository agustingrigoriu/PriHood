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
  tipos_amenities: object;
  loading: boolean = true;
  private defaultDate = new Date(2017, 1, 6);


  constructor(public AmenitiesService: AmenitiesService,
    public alertCtrl: AlertController, ) {
  }

  async ionViewWillEnter() {
    await this.getTiposAmenities();
    await this.actualizar();
  }

  actualizar() {
    this.loading = true;
    return this.AmenitiesService.getReservas().then(response => {
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

  estaCancelada(miReserva: MiReserva){
    return (miReserva.reserva.estado != "creada")
  }

  async getTiposAmenities() {
    try {
      const response = await this.AmenitiesService.getTiposAmenities();
      if (response.error) throw 'error';

      this.tipos_amenities = response.data.reduce<object>((objeto, tipo) => ({ ...objeto, [tipo.id]: tipo }), {});
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Sin conexión',
        message: 'Vuelva a intentar',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
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

  async cancelarReserva(reservaSeleccionada: MiReserva) {
    try {
      const id_reserva = reservaSeleccionada.reserva.id; 
      await this.AmenitiesService.cancelarReserva(id_reserva);
      this.actualizar();
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Error',
        message: 'No se pudo cancelar la reserva. Intente nuevamente',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  confirmarCancelacion(reservaSeleccionada: MiReserva) {
    const confirm = this.alertCtrl.create({
      title: 'Cancelar reserva',
      message: '¿Está seguro que desea cancelar su reserva?',
      buttons: [
        {
          text: 'No',
        },
        {
          text: 'Si, seguro',
          handler: () => {
            this.cancelarReserva(reservaSeleccionada);
          }
        }
      ]
    });
    confirm.present();
  }

}