import { Component } from "@angular/core";
import { Platform, LoadingController, NavController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { MenuService } from "./api/menu.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  private name: string = "Name";
  private site_img: string = "";
  public active: boolean = true

  public appPages = [
    {
      title: "หน้าแรก",
      url: "/menu",
      icon: "home"
    },
    {
      title: "ทำข้อสอบออนไลน์",
      url: "/list-testing",
      icon: "book"
    },
    {
      title: "ผลการสอบ",
      url: "/review-student",
      icon: "clipboard"
    },
    {
      title: "ออกจากระบบ",
      url: "/home",
      icon: "unlock"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private menuService: MenuService
  ) {
    this.loadName();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  loadName() {
    this.name = this.menuService.get_name();
    this.site_img = this.menuService.get_site_img();

    if (
      this.name == "Admin" ||
      this.name == "admin" ||
      this.name == "ADMIN" ||
      this.name == "ad"
    ) {
      this.active = false
      this.appPages = [
        {
          title: "หน้าแรก",
          url: "/menu",
          icon: "home"
        },
        {
          title: "จัดการชุดข้อสอบ",
          url: "/admin",
          icon: "create"
        },
        {
          title: "จัดการบัญชีผู้ใช้",
          url: "/admin",
          icon: "contacts"
        },
        {
          title: "ผลการสอบ",
          url: "/review-student",
          icon: "clipboard"
        },
        {
          title: "ออกจากระบบ",
          url: "/home",
          icon: "unlock"
        }
      ];
    } else {
      this.active = true
      this.appPages = [
        {
          title: "หน้าแรก",
          url: "/menu",
          icon: "home"
        },
        {
          title: "ทำข้อสอบออนไลน์",
          url: "/list-testing",
          icon: "book"
        },
        {
          title: "ผลการสอบ",
          url: "/review-student",
          icon: "clipboard"
        },
        {
          title: "ออกจากระบบ",
          url: "/home",
          icon: "unlock"
        }
      ];
    }
  }
}
