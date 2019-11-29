import { Component } from '@angular/core';
import { Platform, LoadingController, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public user: string;
  public pass: string;

  public appPages = [
    {
      title: 'หน้าแรก',
      url: '/menu',
      icon: 'home'
    },
    {
      title: 'ทำข้อสอบออนไลน์',
      url: '/list-testing',
      icon: 'book'
    },
    {
      title: 'ผลการสอบ',
      url: '/review-student',
      icon: 'clipboard'
    },
    {
      title: 'ออกจากระบบ',
      url: '/home',
      icon: 'unlock'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
