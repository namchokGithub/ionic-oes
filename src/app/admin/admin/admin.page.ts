import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  private crsId: number;
  private Year: number;
  private crs_term: number;
  
  private rs_subject: []

  private hide = false;

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }

  // Add subject item
  async addItem() {

    const alert = await this.alertController.create({
      header: "ต้องการสร้างชุดข้อสอบ",
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
