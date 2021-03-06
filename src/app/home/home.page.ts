import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";
import {
  MenuController,
  LoadingController,
  NavController
} from "@ionic/angular";
import { ToastController } from "@ionic/angular";
import { OnlineTestingService } from "src/app/api/online-testing.service";
import { MenuService } from "src/app/api/menu.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  private username: string = "";
  private password: string = "";
  private checkPass: string = "";
  private name: string = "";
  private site: string = "";
  private status: boolean;
  private allUser: []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuCtrl: MenuController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    public toastController: ToastController,
    public OnlineTestingService: OnlineTestingService,
    private menuService: MenuService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.menuCtrl.swipeEnable(false);

    this.site = this.menuService.get_site_img();
    this.name = this.menuService.get_name();
    this.menuService.getAllUser().subscribe((response) => {
      console.log(response)
      this.allUser = response
    });

    this.route.queryParams.subscribe(params => {
      // Load password

      if (this.router.getCurrentNavigation().extras.state) {
        this.username = this.router.getCurrentNavigation().extras.state.username;
      }
    });
  }

  async validate() {
    let check: Boolean = true

    if (this.username != "" && this.password != "") {

      for(let i=0;i<this.allUser.length;i++) {
        if(this.username==this.allUser[i].user_id && this.password==this.allUser[i].user_password){
          this.name = this.allUser[i].user_firstname + " " + this.allUser[i].user_lastname
          check = false

          if(this.allUser[i].type===2){
            this.menuService.asAdmin()
            console.log(this.menuService.getStatus())
          }else {
            this.menuService.asStudent()
            console.log(this.menuService.getStatus())
          }
          this.login();
        }
      }

      if(check){
        const alert = await this.alertController.create({
          header: 'แจ้งเตือน',
          message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
          buttons: ['ตกลง']
        });
    
        await alert.present();
      }
      
    } else {
      if (this.username == "") this.checkLogin();
      else this.validatePass();
    }
  }

  async validatePass() {
    const toast = await this.toastController.create({
      message: "กรุณาใส่รหัสผ่าน",
      duration: 3000,
      position: "bottom",
      showCloseButton: true
    });
    toast.present();
  }

  checkPassword() {
    // load pass word with username
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

  async login() {
    this.settingUser();

    const loading = await this.loadingController
      .create({
        spinner: "lines",
        duration: 100,
        message: "รอสักครู่...",
        translucent: true
      })
      .then(res => {
        res.present();
        res.onDidDismiss().then(dis => {
          let navigationExtras: NavigationExtras = {
            state: {
              name: this.name
            }
          };
          this.navCtrl.navigateRoot(["/menu"], navigationExtras);
        });
      });
  }

  settingUser() {
    // Namchok edit
    if (this.username.length == 8) {
      this.OnlineTestingService.get_student(this.username).subscribe(
        res => {
          // Set image
          this.site =
            "https://reg.buu.ac.th/registrar/getstudentimage.asp?id=" +
            this.username;

          if (res == null) {
            this.name = this.username;
          } else this.name = res.name;

          this.menuService.set_name(this.name);
          this.menuService.set_site_img(this.site);
        },
        err => {
          console.log("Error " + err);
        }
      );
    } else {

      this.site = "https://image.flaticon.com/icons/svg/145/145849.svg";

      this.menuService.set_name(this.name);
      this.menuService.set_site_img(this.site);
    }
    // console.log(this.menuService.get_site_img());
    // console.log(this.menuService.get_name());
  }

  async register() {
    const loading = await this.loadingController
      .create({
        spinner: "lines",
        duration: 50,
        message: "รอสักครู่...",
        translucent: true
      })
      .then(res => {
        res.present();
        res.onDidDismiss().then(dis => {
          this.navCtrl.navigateRoot(["/regis"]);
        });
      });
  }
}
