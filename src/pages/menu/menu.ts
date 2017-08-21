import { Component, ViewChild } from '@angular/core';
import { Nav, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { LoginService } from '../../services/login.service';
import { VisitasPage } from '../visitas/visitas'
import { AlertasPage } from '../alertas/alertas'

@Component({
  templateUrl: 'menu.html'
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  pages: Array<{ title: string, component: any }>;
  root = VisitasPage;

  constructor(public loginService: LoginService) {
    //Declarar aqui las paginas a incluir en el Menu Principal
    this.pages = [
      { title: 'Visitas', component: VisitasPage },
      { title: 'Alertas', component: AlertasPage },
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
