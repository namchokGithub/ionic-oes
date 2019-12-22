import { Component, OnInit} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController, LoadingController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private username : string = "";

  constructor(private menuCtrl: MenuController, private loadingController: LoadingController, private navCtrl: NavController,public toastController: ToastController) { }
  
  ngOnInit() {
    this.menuCtrl.swipeEnable(false);
  }

  validate(){
    if(this.username!=""){
      this.login()
    }else{
      this.presentToast()
    }
  }

  async presentToast() {
    const toast =  await this.toastController.create({
      message: 'กรุณาใส่ชื่อผู้ใช้',
      duration: 3000,
      position: 'bottom',
      showCloseButton: true
    });
    toast.present();
  }

  async login() {
    // console.log(this.username)
    const loading = await this.loadingController.create({
      spinner: 'lines',
      duration: 100,
      message: 'รอสักครู่...',
      translucent: true
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        let navigationExtras: NavigationExtras = {
          state: {
            username: this.username
          }
        };
        this.navCtrl.navigateRoot(['/menu'], navigationExtras)
      });
    });
  }
}

