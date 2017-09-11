import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';

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
  private turnoSeleccionado;
  private turnos: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public AmenitiesService: AmenitiesService) {
    this.amenity = navParams.get("amenity");
    this.fecha = navParams.get("fecha");
    
    this.cargarTurnosPrueba();
  }

  dismiss() {
    this.navCtrl.pop();
  }

  cargarTurnosPrueba() {
    this.turnos = [
      {
        id: '1',
        nombre: 'Mañana',
        hora_desde: '10:00',
        duracion: '120',
        costo: '100',
        id_amenity: '1',
        id_dia_semana: '1'
      },
      {
        id: '2',
        nombre: 'Mañana',
        hora_desde: '13:00',
        duracion: '60',
        costo: '100',
        id_amenity: '1',
        id_dia_semana: '1'
      }
    ];
  }

  //solo a modo de prueba hasta definir modo de manejo de visualizacion de disponibilidad
  turnoDisponible(){
    return true;
  }

  ionViewWillEnter() {
  }

  onSelectTurno(turnoSeleccionado) {
    this.turnoSeleccionado = turnoSeleccionado;
  }

}