import { Component, ViewChild } from '@angular/core';
import { NavController, Searchbar } from 'ionic-angular';
import { DetalleMiSolicitudPage } from '../../misSolicitudes/detalleMiSolicitud/detalleMiSolicitud';

@Component({
  selector: 'nuevaSolicitud',
  templateUrl: 'nuevaSolicitud.html'
})

export class NuevaSolicitudPage {
  @ViewChild('lugar') lugarElement: Searchbar;

  private lugarTexto: string;
  private fechaFiltro = new Date().toISOString();

  constructor(public navCtrl: NavController) { }

  volver() {
    this.navCtrl.pop();
  }

  ionViewWillEnter() {
    this.loadAutocompletar();
  }

  loadAutocompletar() {
    const autocomplete = new google.maps.places.Autocomplete(this.lugarElement._searchbarInput.nativeElement, { componentRestrictions: { country: 'ar' } });
    autocomplete.addListener('place_changed', () => {
      this.lugarTexto = autocomplete.getPlace().name;
    });
  }

  verDetalleSolicitud(){
    this.navCtrl.push(DetalleMiSolicitudPage);
  }

}