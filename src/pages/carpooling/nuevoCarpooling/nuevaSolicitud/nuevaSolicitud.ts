import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';
import { DetalleMiSolicitudPage } from '../../misSolicitudes/detalleMiSolicitud/detalleMiSolicitud';

import { CarpoolingService } from '../../carpooling.service';

import { Viaje } from '../../../../app/models/viaje.model';

@Component({
  selector: 'nuevaSolicitud',
  templateUrl: 'nuevaSolicitud.html'
})

export class NuevaSolicitudPage {
  @ViewChild('lugar') lugarElement: Searchbar;

  private lugarTexto: string;
  private fechaFiltro = new Date().toISOString();

  public viajes: Viaje[];

  constructor(public navCtrl: NavController, public CarpoolingService: CarpoolingService) {
    this.viajes = [];
  }

  volver() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.loadAutocompletar();
    this.cargarViajes();
  }

  fechaSeleccionada() {
    this.cargarViajes();
  }

  async cargarViajes() {
    try {
      const response = await this.CarpoolingService.getViajes(this.fechaFiltro);

      if (response.error) {
        throw 'error';
      }

      this.viajes = response.data;
    } catch (error) {
      alert('Error cargando viajes');
    }
  }

  loadAutocompletar() {
    const autocomplete = new google.maps.places.Autocomplete(this.lugarElement._searchbarInput.nativeElement, { componentRestrictions: { country: 'ar' } });
    autocomplete.addListener('place_changed', () => {
      this.lugarTexto = autocomplete.getPlace().name;
    });
  }

  verDetalleSolicitud(viaje: Viaje) {
    this.navCtrl.push(DetalleMiSolicitudPage, { viaje });
  }

}