import { Component, OnInit} from '@angular/core';

import { MenuController, LoadingController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private username : string;

  constructor(private menuCtrl: MenuController, private loadingController: LoadingController, private navCtrl: NavController) { }
  
  ngOnInit() {
    this.menuCtrl.swipeEnable(false);
  }

  async login() {
    console.log(this.username)
    const loading = await this.loadingController.create({
      spinner: 'lines',
      duration: 100,
      message: 'รอสักครู่...',
      translucent: true
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        this.navCtrl.navigateRoot('/menu')
      });
    });
  }
}

