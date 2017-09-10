import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

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
import { AmenitiesPage } from '../pages/amenities/amenities';
import { ProveedoresPage } from '../pages/proveedores/proveedores';
import { RegistroProveedorPage } from '../pages/proveedores/registroProveedor/registroProveedor';
import { ValorarProveedorPage } from '../pages/proveedores/valorarProveedor/valorarProveedor';
import { CarpoolingPage } from '../pages/carpooling/carpooling';
import { ExpensasPage } from '../pages/expensas/expensas';
import { ListaAmenitiesPage } from '../pages/amenities/listaAmenities/listaAmenities';

//Services
import { ApiRequestService } from '../services/api.request.service';
import { LoginService } from '../services/login.service';
import { CodigoRegistroService } from '../pages/usuario/codigoRegistro/codigoRegistro.service';
import { RegistroUsuarioService } from '../pages/usuario/registroUsuario/registroUsuario.service';
import { ProveedorService } from '../pages/proveedores/proveedores.service';
import { VisitanteService } from '../pages/visitas/visitas.service';
import { AmenitiesService } from '../pages/amenities/amenities.service';

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
  AmenitiesPage,
  ProveedoresPage,
  RegistroProveedorPage,
  ExpensasPage,
  ValorarProveedorPage,
  ListaAmenitiesPage,
  VisitasDetallePage,
  MenuPage,
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
    IonicModule.forRoot(MyApp)
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
    VisitanteService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
