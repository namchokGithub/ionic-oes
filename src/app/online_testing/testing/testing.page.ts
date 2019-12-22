import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineTestingService } from 'src/app/api/online-testing.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
  private asg_id: number
  private asr_id: number
  private count_insert: number;

  private show_button: boolean

  private list_choice: any[]
  private list_question: any[]

  slideOpts = {
    initialSlide: 0,
    speed: 100,
    pagination: {
      el: '.swiper-pagination',
      modifierClass: 'nameyourspecialclass'
    }
  };

  constructor(private menuCtrl: MenuController, private loadingController: LoadingController, public navCtrl: NavController, public alertController: AlertController, public activatedRoute: ActivatedRoute, public OnlineTestingService: OnlineTestingService, public router: Router, public actionSheetController: ActionSheetController) {
    this.activatedRoute.queryParams.subscribe((res) => {
      this.asg_id = res.asg_id
      this.show_button = false
      this.count_insert = 0
    });
  }

  ngOnInit() {
    this.menuCtrl.swipeEnable(false);
    this.set_data()
  }

  async set_data() {
    this.OnlineTestingService.get_qestion(this.asg_id).subscribe((response) => {
      this.asr_id = response.qu_asr_id
      this.list_question = response.rs_list_question
      this.list_choice = response.rs_list_choice
      this.count_insert = this.list_question.length
      console.log(this.list_question.length)
      console.log(this.list_choice)
    });
  }

  async send() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'ยืนยันการส่งคำตอบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.OnlineTestingService.update_end_testing(this.asr_id).subscribe((response) => {
              this.navCtrl.navigateRoot('/menu')
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async cancle() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'ยกเลิกการสอบ',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'ยืนยัน',
          handler: () => {
            this.navCtrl.navigateRoot('/list-testing')
            console.log('Confirm Ok');
          }
        }
      ]
    });
    await alert.present();
  }

  insert_choice(choice_id: number, qt_id: number) {
    this.OnlineTestingService.insert_choice(choice_id, qt_id, this.asr_id).subscribe((res) => {
      console.log(res);
      if (res == 'insert') {
        this.count_insert--;
      }
      this.check_question()
    });
  }

  async check_question() {
    if (this.count_insert <= 0) {
      this.show_button = true
    }
  }

}
