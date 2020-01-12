import { Component, OnInit } from "@angular/core";
import { NavController, AlertController, ToastController } from "@ionic/angular";
import { NavigationExtras } from "@angular/router";

@Component({
  selector: "app-regis",
  templateUrl: "./regis.page.html",
  styleUrls: ["./regis.page.scss"]
})
export class RegisPage implements OnInit {
  private name: string = "";
  private username: string = "";
  private password: string = "";

  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  ngOnInit() {}

  back() {
    this.navCtrl.navigateRoot(["/home"]);
  }

  async checkPassword() {
    const toast = await this.toastController.create({
      message: "กรุณาใส่รหัสผ่าน",
      duration: 3000,
      position: "bottom",
      showCloseButton: true
    });
    toast.present();
  }

  async checkLogin() {
    const toast = await this.toastController.create({
      message: "กรุณาใส่ชื่อผู้ใช้",
      duration: 3000,
      position: "bottom",
      showCloseButton: true
    });
    toast.present();
  }

  async checkName() {
    const toast = await this.toastController.create({
      message: "กรุณาใส่ชื่อและนามสกุล",
      duration: 3000,
      position: "bottom",
      showCloseButton: true
    });
    toast.present();
  }

  validate() {
    if (this.username != "" && this.password != "" && this.name != "") {
      this.regis();
    } else {
      if (this.name == "") this.checkName();
      else if (this.username == "") this.checkLogin();
      else this.checkPassword();
    }
  }

  // Send username
  async regis() {

    const alert = await this.alertController.create({
      header: "ยืนยันการสมัคร",
      // message: "ยืนยันการสมัคร",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "ยืนยัน",
          handler: () => {
            let navigationExtras: NavigationExtras = {
              state: {
                username: this.username
              }
            };
            this.navCtrl.navigateRoot(["/home"], navigationExtras);
          }
        }
      ]
    });
    await alert.present();
  }

  // Add user to database
  add_account() {}
}
