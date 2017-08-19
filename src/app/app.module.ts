import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

//Pages
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { NoRegistradoPage } from '../pages/usuario/noRegistrado/noRegistrado'
import { VisitasPage } from '../pages/visitas/visitas'
import { VisitasActualesTab } from '../pages/visitas/visitasActuales/visitasActuales';
import { VisitasFrecuentesTab } from '../pages/visitas/visitasFrecuentes/visitasFrecuentes';
import { RegistroUsuarioPage } from '../pages/usuario/registroUsuario/registroUsuario';
import { CodigoRegistroPage } from '../pages/usuario/codigoRegistro/codigoRegistro';
import { RegistroVisitaPage } from '../pages/visitas/registroVisita/registroVisita';


//Services
import { ApiRequestService } from '../services/api.request.service';
import { LoginService } from '../services/login.service';
import { CodigoRegistroService } from '../pages/usuario/codigoRegistro/codigoRegistro.service';
import { RegistroUsuarioService } from '../pages/usuario/registroUsuario/registroUsuario.service';
import { RegistroVisitaService } from '../pages/visitas/registroVisita/registroVisita.service';

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
  MenuPage
];

@NgModule({
  declarations: [
    ...pages
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiRequestService,
    CodigoRegistroService,
    RegistroUsuarioService,
    LoginService,
    RegistroVisitaService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
