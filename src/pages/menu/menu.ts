import { Component, ViewChild } from '@angular/core';
import { Nav, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LoginService } from '../../services/login.service';
import { VisitasPage } from '../visitas/visitas'
import { AlertasPage } from '../alertas/alertas'
import { AmenitiesPage } from '../amenities/amenities'
import { CarpoolingPage } from '../carpooling/carpooling'
import { ExpensasPage } from '../expensas/expensas'
import { ProveedoresPage } from '../proveedores/proveedores'
import { EventosPage } from '../eventos/eventos'
import { ComunicacionPage } from '../comunicacion/comunicacion'

@Component({
  templateUrl: 'menu.html'
})
export class MenuPage {
@ViewChild(Nav) nav: NavController;

  pages: Array<{ title: string, component: any, icon: string }>;
  root = AmenitiesPage;

  constructor(public loginService: LoginService) {
    //Declarar aqui las paginas a incluir en el Menu Principal
    this.pages = [
      { title: 'Visitas', component: VisitasPage, icon: 'people' },
      { title: 'Servicios', component: ProveedoresPage, icon: 'hammer' },
      { title: 'Amenities', component: AmenitiesPage, icon: 'tennisball'},
      { title: 'Expensas', component: ExpensasPage, icon: 'cash'},
      { title: 'Alertas', component: AlertasPage, icon: 'warning'},
      { title: 'Carpooling', component: CarpoolingPage, icon: 'car'},
      { title: 'Eventos', component: EventosPage, icon: 'bicycle'},
      { title: 'Comunicacion', component: ComunicacionPage, icon: 'chatboxes'}
    ];
  }

  logout() {
    this.loginService.clearSession();
    this.nav.setRoot(LoginPage);
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
