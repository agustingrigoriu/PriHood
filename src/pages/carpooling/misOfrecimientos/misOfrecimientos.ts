import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { CarpoolingService } from '../carpooling.service';

@Component({
  selector: 'misOfrecimientos',
  templateUrl: 'misOfrecimientos.html'
})

export class MisOfrecimientosPage {

  private misOfrecimientosPendientes: any[];
  private misOfrecimientosAceptados: any[];
  ofrecimientos: string = 'pendientes';

  constructor(public navCtrl: NavController, public CarpoolingService: CarpoolingService, public alertCtrl: AlertController) { }

  actualizar() {
    this.misOfrecimientosPendientes = [];
    this.misOfrecimientosAceptados = [];

    this.CarpoolingService.getMisOfrecimientos().then(response => {
      if (response.error) {
        const alertMessage = this.alertCtrl.create({
          title: 'Error',
          message: 'Problemas de conexión. Intente nuevamente',
          buttons: ['Ok']
        });
        alertMessage.present();
      } else {
        for (let solcitudGrupo of response.data) {
          switch (solcitudGrupo.estado) {
            case 'Aceptada':
              this.misOfrecimientosAceptados = this.misOfrecimientosPendientes.concat(solcitudGrupo.grupo);
              break;
            case 'Pendiente':
              this.misOfrecimientosPendientes = solcitudGrupo.grupo;
              break;
          }
        }
      }
    });
  }

  ionViewWillEnter() {
    this.actualizar();
  }

}