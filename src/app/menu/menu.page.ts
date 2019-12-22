import { Component, OnInit } from '@angular/core';

// Receive Parameter
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  private username : string = "Name";
  private site_img : string = "";

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.username = this.router.getCurrentNavigation().extras.state.username;
      }
    });
  }

  ngOnInit() {
    if(this.username.length==8){
      this.site_img = "https://reg.buu.ac.th/registrar/getstudentimage.asp?id="+this.username
    }else{
      this.site_img = "https://image.flaticon.com/icons/svg/145/145849.svg"
    }
  }




}
