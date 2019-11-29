import { Component, OnInit} from '@angular/core';

import { MenuController, LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private menuCtrl: MenuController, private loadingController: LoadingController, private navCtrl: NavController) { }
  
  ngOnInit() {
    this.menuCtrl.swipeEnable(false);
  }

  async login() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      duration: 200,
      message: 'Please wait...',
      translucent: true
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        this.navCtrl.navigateRoot('/menu')
        console.log('Loading dismissed!');
      });
    });
  }
}

