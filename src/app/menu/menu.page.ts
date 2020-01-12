import { Component, OnInit } from "@angular/core";
import { OnlineTestingService } from "src/app/api/online-testing.service";
import { MenuService } from "src/app/api/menu.service";

// Receive Parameter
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.page.html",
  styleUrls: ["./menu.page.scss"]
})
export class MenuPage implements OnInit {

  private name: string = "ชื่อผู้ใช้งาน";
  public menuAdmin: boolean = false;
  public menuTest: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public OnlineTestingService: OnlineTestingService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.name = this.router.getCurrentNavigation().extras.state.name;
        this.menuService.set_name(this.name);
      }
    });
  }

  ionViewWillEnter(){
    this.name = this.menuService.get_name()
    if (
      this.name == "Admin" ||
      this.name == "admin" ||
      this.name == "ADMIN" ||
      this.name == "ad"
    ) {
      this.menuTest = false;
      this.menuAdmin = true;
    }
  }
  
}
