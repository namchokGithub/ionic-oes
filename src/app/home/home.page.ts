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
  private password : string = "";

  constructor(private menuCtrl: MenuController, private loadingController: LoadingController, private navCtrl: NavController,public toastController: ToastController) { }
  
  ngOnInit() {
    this.menuCtrl.swipeEnable(false);
  }

  validate(){
    if(this.username!="" && this.password!=""){
      this.login()
    }else{

      if(this.username=="")
        this.checkLogin()
      else
        this.checkPassword()
    }
  }

  async checkPassword() {
    const toast =  await this.toastController.create({
      message: 'กรุณาใส่รหัสผ่าน',
      duration: 3000,
      position: 'bottom',
      showCloseButton: true
    });
    toast.present();
  }

  async checkLogin() {
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
            username: this.username,
            password: this.password
          }
        };
        this.navCtrl.navigateRoot(['/menu'], navigationExtras)
      });
    });
  }
}

