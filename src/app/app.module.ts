import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { NoRegistradoPage } from '../pages/usuario/noRegistrado/noRegistrado'
import { VisitasPage } from '../pages/visitas/visitas'
import { VisitasActualesTab } from '../pages/visitas/visitasActuales/visitasActuales';
import { VisitasFrecuentesTab } from '../pages/visitas/visitasFrecuentes/visitasFrecuentes';
import { RegistroUsuarioPage } from '../pages/usuario/registroUsuario/registroUsuario';
import { CodigoRegistroPage } from '../pages/usuario/codigoRegistro/codigoRegistro';

import { DataExampleService } from './services/data.service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    NoRegistradoPage,
    VisitasPage,
    VisitasActualesTab,
    VisitasFrecuentesTab,
    RegistroUsuarioPage,
    CodigoRegistroPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NoRegistradoPage,
    VisitasPage,
    VisitasActualesTab,
    VisitasFrecuentesTab,
    RegistroUsuarioPage,
    CodigoRegistroPage

    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DataExampleService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
