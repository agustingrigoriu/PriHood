import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, TextInput, LoadingController } from 'ionic-angular';

@Component({
  selector: 'nuevoOfrecimiento',
  templateUrl: 'nuevoOfrecimiento.html'
})

export class NuevoOfrecimientoPage {
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('lugar') lugarElement: TextInput;

  constructor(public navCtrl: NavController, public loadingController: LoadingController) { }

  private map: google.maps.Map;
  private lugarTexto: string;
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
      map: this.map
    });

    this.loadAutocompletar();
  }

  loadAutocompletar() {
    const defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-31.287298093935906, -64.27276611328125),
      new google.maps.LatLng(-31.466684480014145, -64.1395568847656)
    );
    const autocomplete = new google.maps.places.Autocomplete(this.lugarElement._native.nativeElement, { componentRestrictions: { country: 'ar' } });
    autocomplete.addListener('place_changed', () => {
      this.lugarTexto = autocomplete.getPlace().name;

      this.calcularRuta();
    });
  }

  calcularRuta() {
    const loading = this.loadingController.create();

    loading.present();

    this.directionsService.route({
      origin: this.ubicacionBarrio,
      destination: this.lugarTexto,
      travelMode: google.maps.TravelMode.DRIVING
    }, (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
      this.directionsDisplay.setDirections(result);

      loading.dismiss();

      //console.log(result.routes[0].overview_path.map(a => a.toJSON()));
    });

    this.directionsDisplay.addListener('directions_changed', () => {
      this.map.fitBounds(this.directionsDisplay.getDirections().routes[0].bounds);
    });
  }

  volver() {
    this.navCtrl.pop();
  }
}