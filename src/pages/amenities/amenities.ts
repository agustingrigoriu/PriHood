import { Component } from '@angular/core';
import { NuevaReservaPage } from './nuevaReserva/nuevaReserva';
import { MisReservasPage } from './misReservas/misReservas';

@Component({
  templateUrl: 'amenities.html'

})
export class AmenitiesPage {

  nuevaReserva: any;
  misReservas: any;

  constructor() {
    this.nuevaReserva = NuevaReservaPage;
    this.misReservas = MisReservasPage;
  }

}