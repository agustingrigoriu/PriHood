import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { LoginService } from '../services/login.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public loginService: LoginService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const session = loginService.getSession();

      this.rootPage = session === null ? LoginPage : MenuPage;

      setTimeout(() => {
        if (!window['plugins'] || !window['plugins'].OneSignal) return;
        window['plugins'].OneSignal
          .startInit('8f473da7-dec3-47be-ad34-e2a4988b6587', '1038028333958')
          .endInit();

        window['plugins'].OneSignal.getIds((ids) => {
          this.handlerIds(ids.userId);
        });
      }, 10000);
    });
  }

  handlerIds(userId: string) {
    this.loginService.savePushToken(userId);
    this.loginService.postPushToken(userId);
  }
}

