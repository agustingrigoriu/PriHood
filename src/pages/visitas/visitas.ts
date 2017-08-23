import { Component } from '@angular/core';
import { VisitasActualesTab } from './visitasActuales/visitasActuales';
import { VisitasFrecuentesTab } from './visitasFrecuentes/visitasFrecuentes';

@Component({
  templateUrl: 'visitas.html'

})
export class VisitasPage {


  visitasActuales: any;
  visitasFrecuentes: any;

  constructor() {
    this.visitasActuales = VisitasActualesTab;
    this.visitasFrecuentes = VisitasFrecuentesTab;
  }

}