import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  public rs_user = [
    {
      name: "Namchok",
      id: 12
    },
    {
      name: "Namchok2",
      id: 2
    },
    {
      name: "Namchok3",
      id: 3
    }
  ]

  constructor(private navCtrl: NavController, public alertController: AlertController) { }

  ngOnInit() {
  }

  async delete(id){
    const alert = await this.alertController.create({
      header: "ต้องการลบบัญชีหรือไม่ ?",
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
          role: "submit",
          cssClass: "secondary",
          handler: () => {
            
          }
        }
      ]
    });
    await alert.present();
  }
}
