import { Component, OnInit } from '@angular/core';

// Receive Parameter
import { ActivatedRoute, Router} from '@angular/router';
import { OnlineTestingService } from 'src/app/api/online-testing.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  private username : string = "Name";
  private password : string = "";
  private name : string = "Name";
  private site_img : string = "";

  constructor(private route: ActivatedRoute, private router: Router, public OnlineTestingService: OnlineTestingService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.username = this.router.getCurrentNavigation().extras.state.username;
        this.password = this.router.getCurrentNavigation().extras.state.password;
      }
    });
  }

  ngOnInit() {
    if(this.username.length==8){
      this.OnlineTestingService.get_student(this.username).subscribe((res) => {
        console.log(res)
        this.name = res.name
      });
      this.site_img = "https://reg.buu.ac.th/registrar/getstudentimage.asp?id="+this.username
    }else{
      this.name = this.username
      this.site_img = "https://image.flaticon.com/icons/svg/145/145849.svg"
    }
  }




}
