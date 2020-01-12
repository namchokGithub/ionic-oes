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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuCtrl: MenuController,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    public toastController: ToastController,
    public OnlineTestingService: OnlineTestingService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.menuCtrl.swipeEnable(false);

    this.site = this.menuService.get_site_img();
    this.name = this.menuService.get_name();

    this.route.queryParams.subscribe(params => {
      // Load password

      if (this.router.getCurrentNavigation().extras.state) {
        this.username = this.router.getCurrentNavigation().extras.state.username;
      }
    });
  }

  validate() {
    if (this.username != "" && this.password != "") {
      this.login();
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
      this.name = this.username;
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
