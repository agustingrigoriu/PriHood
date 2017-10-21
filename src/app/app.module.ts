import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { LOCALE_ID } from '@angular/core';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Ionic2RatingModule } from 'ionic2-rating';

//Pages
import { QRScannerPage } from '../pages/usuario/qrscanner/qrscanner';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { NoRegistradoPage } from '../pages/usuario/noRegistrado/noRegistrado'
import { VisitasPage } from '../pages/visitas/visitas'
import { VisitasActualesTab } from '../pages/visitas/visitasActuales/visitasActuales';
import { VisitasFrecuentesTab } from '../pages/visitas/visitasFrecuentes/visitasFrecuentes';
import { VisitasDetallePage } from '../pages/visitas/visitasDetalle/visitasDetalle';
import { RegistroUsuarioPage } from '../pages/usuario/registroUsuario/registroUsuario';
import { CodigoRegistroPage } from '../pages/usuario/codigoRegistro/codigoRegistro';
import { RegistroVisitaPage } from '../pages/visitas/registroVisita/registroVisita';
import { AlertasPage } from '../pages/alertas/alertas';
import { TurnosAmenityPage } from '../pages/amenities/turnosAmenity/turnosAmenity';
import { AmenitiesPage } from '../pages/amenities/amenities';
import { NuevaReservaPage } from '../pages/amenities/nuevaReserva/nuevaReserva';
import { MisReservasPage } from '../pages/amenities/misReservas/misReservas';
import { ProveedoresPage } from '../pages/proveedores/proveedores';
import { RegistroProveedorPage } from '../pages/proveedores/registroProveedor/registroProveedor';
import { ValorarProveedorPage } from '../pages/proveedores/valorarProveedor/valorarProveedor';
import { CarpoolingPage } from '../pages/carpooling/carpooling';
import { MisOfrecimientosPage } from '../pages/carpooling/misOfrecimientos/misOfrecimientos';
import { MisSolicitudesPage } from '../pages/carpooling/misSolicitudes/misSolicitudes';
import { DetalleMiSolicitudPage } from '../pages/carpooling/misSolicitudes/detalleMiSolicitud/detalleMiSolicitud';
import { NuevoCarpoolingPage } from '../pages/carpooling/nuevoCarpooling/nuevoCarpooling';
import { NuevoOfrecimientoPage } from '../pages/carpooling/nuevoCarpooling/nuevoOfrecimiento/nuevoOfrecimiento';
import { NuevoOfrecimientoMapaPage } from '../pages/carpooling/nuevoCarpooling/nuevoOfrecimientoMapa/nuevoOfrecimientoMapa';
import { NuevaSolicitudPage } from '../pages/carpooling/nuevoCarpooling/nuevaSolicitud/nuevaSolicitud';
import { ExpensasPage } from '../pages/expensas/expensas';
import { ComunicacionPage } from '../pages/comunicacion/comunicacion';
import { DetallePublicacionPage } from '../pages/comunicacion/detallePublicacion/detallePublicacion';
import { MensajeDirectoPage } from '../pages/comunicacion/mensajeDirecto/mensajeDirecto';
import { NuevoMensajeDirectoPage } from '../pages/comunicacion/mensajeDirecto/nuevoMensajeDirecto/nuevoMensajeDirecto';
import { ChatBoxMensajePage } from '../pages/comunicacion/mensajeDirecto/chatBoxMensaje/chatBoxMensaje';
import { PublicacionesPage } from '../pages/comunicacion/publicaciones/publicaciones';
import { EventosPage } from '../pages/eventos/eventos';
import { ListaAmenitiesPage } from '../pages/amenities/listaAmenities/listaAmenities';

//Services
import { ApiRequestService } from '../services/api.request.service';
import { LoginService } from '../services/login.service';
import { CodigoRegistroService } from '../pages/usuario/codigoRegistro/codigoRegistro.service';
import { RegistroUsuarioService } from '../pages/usuario/registroUsuario/registroUsuario.service';
import { ProveedorService } from '../pages/proveedores/proveedores.service';
import { VisitanteService } from '../pages/visitas/visitas.service';
import { AmenitiesService } from '../pages/amenities/amenities.service';
import { AlertasService } from '../pages/alertas/alertas.service';
import { ExpensasService } from '../pages/expensas/expensas.service';
import { CarpoolingService } from '../pages/carpooling/carpooling.service';
import { ComunicacionService } from '../pages/comunicacion/comunicacion.service';

// Incluir las paginas acá
const pages = [
  MyApp,
  LoginPage,
  NoRegistradoPage,
  VisitasPage,
  VisitasActualesTab,
  VisitasFrecuentesTab,
  RegistroUsuarioPage,
  CodigoRegistroPage,
  RegistroVisitaPage,
  AlertasPage,
  CarpoolingPage,
  MisSolicitudesPage,
  DetalleMiSolicitudPage,
  NuevoCarpoolingPage,
  AmenitiesPage,
  NuevaReservaPage,
  MisReservasPage,
  TurnosAmenityPage,
  ProveedoresPage,
  RegistroProveedorPage,
  ExpensasPage,
  ValorarProveedorPage,
  ListaAmenitiesPage,
  VisitasDetallePage,
  ComunicacionPage,
  EventosPage,
  MenuPage,
  DetallePublicacionPage,
  MensajeDirectoPage,
  NuevoMensajeDirectoPage,
  NuevaSolicitudPage,
  MisOfrecimientosPage,
  NuevoOfrecimientoPage,
  NuevoOfrecimientoMapaPage,
  ChatBoxMensajePage,
  PublicacionesPage,
  QRScannerPage
];

@NgModule({
  declarations: [
    ...pages
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AmenitiesService,
    QRScanner,
    ApiRequestService,
    CodigoRegistroService,
    RegistroUsuarioService,
    ProveedorService,
    LoginService,
    AlertasService,
    CarpoolingService,
    VisitanteService,
    ExpensasService,
    ComunicacionService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: "es" }
  ]
})
export class AppModule { }
