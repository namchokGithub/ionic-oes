import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineTestingService } from 'src/app/api/online-testing.service';
@Component({
  selector: 'app-detail-testing',
  templateUrl: './detail-testing.page.html',
  styleUrls: ['./detail-testing.page.scss'],
})
export class DetailTestingPage implements OnInit {
  private asg_id: number
  private code_name: string
  private course_name: string
  private course_description: string
  private amount_testing: string
  private time: string

  constructor(private menuCtrl: MenuController, private loadingController: LoadingController, private navCtrl: NavController, public activatedRoute: ActivatedRoute, public OnlineTestingService: OnlineTestingService, public router: Router) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.asg_id = res.asg_id
      this.set_data()
    });
  }
  ngOnInit() {
    this.menuCtrl.swipeEnable(false);
  }

  async start_test() {
    const loading = await this.loadingController.create({
      spinner: 'lines',
      duration: 500,
      message: 'รอสักครู่...',
      translucent: true
    }).then((res) => {
      res.present();
      res.onDidDismiss().then((dis) => {
        this.navCtrl.navigateRoot('/testing')
      });
    });
  }

  set_data() {
    this.OnlineTestingService.get_detail_testing(this.asg_id).subscribe((response) => {
      console.log(response)
      // console.log(response.qu_detail_testing)
      this.code_name = response[0].course_code
      this.course_name = response[0]['course_name']
      this.course_description = response[0]['course_description']
      this.amount_testing = response[0]['amount_testing']
      this.time = response[0]['time_testing']
    });
  }

  onGoToNextPage() {
    this.router.navigate(['/testing'], {
      queryParams: {
        asg_id: this.asg_id
      }
    });
  }
}
