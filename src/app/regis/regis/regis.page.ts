import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-regis",
  templateUrl: "./regis.page.html",
  styleUrls: ["./regis.page.scss"]
})
export class RegisPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  back() {
    this.navCtrl.navigateRoot(["/home"]);
  }

  // Send username
  regis(){
    this.navCtrl.navigateRoot(["/home"]);
  }
}
