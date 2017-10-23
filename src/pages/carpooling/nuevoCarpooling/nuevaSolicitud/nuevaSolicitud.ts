import { Component, ViewChild, NgZone } from '@angular/core';
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
  public punto;

  constructor(public navCtrl: NavController, public CarpoolingService: CarpoolingService, public zone: NgZone) {
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

  async cargarViajesGeo(lat, lng) {
    try {
      const response = await this.CarpoolingService.getViajesGeo(this.fechaFiltro, lat, lng);

      if (response.error) {
        throw 'error';
      }

      this.viajes = response.data;

      // @FIXME: forzar a angular para que actulice la vista
      this.zone.run(() => { });
    } catch (error) {
      alert('Error cargando viajes');
    }
  }


  loadAutocompletar() {
    const autocomplete = new google.maps.places.Autocomplete(this.lugarElement._searchbarInput.nativeElement, { componentRestrictions: { country: 'ar' } });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (place) {
        const { lat, lng } = place.geometry.location;

        this.lugarTexto = place.name;
        this.punto = { longitud: lng(), latitud: lat() };

        this.cargarViajesGeo(this.punto.latitud, this.punto.longitud);
      }
    });
  }

  verDetalleSolicitud(viaje: Viaje) {
    this.navCtrl.push(DetalleMiSolicitudPage, { viaje });
  }

}