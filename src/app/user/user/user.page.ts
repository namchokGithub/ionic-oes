import { Component, OnInit } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { MenuService } from 'src/app/api/menu.service';

@Component({
  selector: "app-user",
  templateUrl: "./user.page.html",
  styleUrls: ["./user.page.scss"]
})
export class UserPage implements OnInit {
  public rs_user

  constructor(
    private navCtrl: NavController,
    public alertController: AlertController,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.menuService.getAllUser().subscribe(response => {
      console.log(response)
      this.rs_user = response;
    });
    
  }

  async delete(id) {
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

            for( var i = 0; i < this.rs_user.length; i++){ 
              if ( this.rs_user[i].id === id) {
                this.rs_user.splice(i, 1); 
              }
           }

            this.menuService
              .delete(id)
              .subscribe(response => {
                console.log("Delete success");
              });
          }
        }
      ]
    });
    await alert.present();
  }
}
