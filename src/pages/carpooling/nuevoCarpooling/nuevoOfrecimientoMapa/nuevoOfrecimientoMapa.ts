import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, TextInput, LoadingController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { CarpoolingService } from '../../carpooling.service';
import { Viaje } from '../../../../app/models/viaje.model';
import { Trayecto } from '../../../../app/models/trayecto.model';

@Component({
  selector: 'nuevoOfrecimientoMapa',
  templateUrl: 'nuevoOfrecimientoMapa.html'
})

export class NuevoOfrecimientoMapaPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('lugarDesde') lugarDesdeElement: TextInput;
  @ViewChild('lugarHasta') lugarHastaElement: TextInput;

  viaje: Viaje;

  constructor(public navCtrl: NavController,
    public loadingController: LoadingController,
    public navParams: NavParams,
    public CarpoolingService: CarpoolingService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.viaje = <Viaje>(navParams.get('viaje'));
  }

  private map: google.maps.Map;
  private lugarDesdeTexto: string;
  private lugarHastaTexto: string;
  private ubicacionBarrio = new google.maps.LatLng(-31.335335, -64.303113);
  private ubicacionCordoba = new google.maps.LatLng(-31.287298093935906, -64.27276611328125);
  private directionsDisplay: google.maps.DirectionsRenderer;
  private directionsService: google.maps.DirectionsService;

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: this.ubicacionCordoba,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      markerOptions: {
        draggable: false,
        position: this.ubicacionBarrio // @FIX: para evitar un error de google.. hay que pasarlo aunque no sea necesario
      }
    });

    this.directionsDisplay.addListener('directions_changed', () => {
      if (this.directionsDisplay.getDirections().routes.length > 0) {
        this.map.fitBounds(this.directionsDisplay.getDirections().routes[0].bounds);
      }
    });

    this.loadAutocompletar();
  }

  loadAutocompletar() {
    const options: google.maps.places.AutocompleteOptions = {
      componentRestrictions: { country: 'ar' }
    };

    const autocompleteHasta = new google.maps.places.Autocomplete(this.lugarHastaElement._native.nativeElement, options);
    autocompleteHasta.addListener('place_changed', () => {
      this.lugarHastaTexto = autocompleteHasta.getPlace().name;

      this.calcularRuta();
    });

    const autocompleteDesde = new google.maps.places.Autocomplete(this.lugarDesdeElement._native.nativeElement, options);
    autocompleteDesde.addListener('place_changed', () => {
      this.lugarDesdeTexto = autocompleteDesde.getPlace().name;

      this.calcularRuta();
    });
  }

  calcularRuta() {
    const loading = this.loadingController.create();

    loading.present();

    this.directionsService.route({
      origin: this.viaje.saleBarrio ? this.ubicacionBarrio : this.lugarDesdeTexto,
      destination: this.viaje.saleBarrio ? this.lugarHastaTexto : this.ubicacionBarrio,
      travelMode: google.maps.TravelMode.DRIVING,
      region: 'ar'
    }, (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
      this.directionsDisplay.setDirections(result);

      loading.dismiss();
    });
  }

  calcularTrayectos(): Trayecto[] {
    try {
      const path = this.directionsDisplay.getDirections().routes[0].overview_path;

      return path.map<Trayecto>((p, i) => ({
        latitud: p.lat(),
        longitud: p.lng(),
        orden: i + 1
      }));
    } catch (error) {
      return [];
    }
  }

  async finalizar() {
    const viaje = this.viaje;
    const trayectos = this.calcularTrayectos();

    if (trayectos.length === 0) {
      const alertMessage = this.alertCtrl.create({
        title: 'Error',
        message: 'Seleccione un trayecto.',
        buttons: ['Ok']
      });
      alertMessage.present();
      return;
    }

    try {
      const response = await this.CarpoolingService.registrarViaje(viaje, trayectos);

      if (response.error) {
        throw 'error';
      }

      this.navCtrl.popToRoot();

      const toast = this.toastCtrl.create({
        message: 'Se guardó correctamente el viaje.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    } catch (error) {
      const alertMessage = this.alertCtrl.create({
        title: 'Error',
        message: 'Corrobore la información del viaje y vuelva a intentar.',
        buttons: ['Ok']
      });
      alertMessage.present();
    }
  }

  volver() {
    this.navCtrl.pop();
  }
}