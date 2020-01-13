import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, NavController, AlertController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineTestingService } from 'src/app/api/online-testing.service';
import { $ } from 'protractor';
import { Response } from '@angular/http';
import { config } from 'rxjs';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.page.html',
  styleUrls: ['./testing.page.scss'],
})
export class TestingPage implements OnInit {
  private asg_id: number
  private asr_id: number
  private rse_id: number
  private count_insert: number
  private result:number
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
      this.show_button = true
      this.count_insert = 0
    });
  }

  ngOnInit() {
    this.menuCtrl.swipeEnable(false);
    this.validation()
  }

  async validation(){
    this.OnlineTestingService.validation(this.asg_id).subscribe((response) =>{
      console.log(response)
      if(response[0] != null){
        this.asr_id = response[0]['asr_id'];
        this.get_list_qestion()
        this.get_list_choice()
        this.get_time_testing()
      }else{
        this.insert_assessor()
      }
    })
  }

  insert_assessor(){
    this.OnlineTestingService.insert_ass(this.asg_id).subscribe((response) =>{
      this.asr_id = response;
      this.get_list_qestion()
      this.get_list_choice()
      this.get_time_testing()
    })
  }

  async get_list_qestion(){
    this.OnlineTestingService.get_list_qestion(this.asg_id).subscribe((response) =>{
      this.list_question = response
      this.count_insert = this.list_question.length
    })
  }

  async get_list_choice(){
    this.OnlineTestingService.get_list_choice(this.asg_id).subscribe((response) =>{
      console.log(response)
      this.list_choice = response
    })
  }

  async get_time_testing(){
    this.OnlineTestingService.get_time_testing(this.asr_id).subscribe((response) =>{
      console.log(response)

    })
  }

  async insert_choice(choice_id: number, qt_id: number){
    this.OnlineTestingService.get_score(choice_id).subscribe((response)=>{  
      this.result =  response[0].cho_answer;
      this.OnlineTestingService.check_insert(qt_id,this.asr_id).subscribe((response)=>{
        
        if(response[0] != null){
          this.rse_id = response[0]['rse_id']
          this.OnlineTestingService.update_choice(choice_id,this.result,this.rse_id).subscribe((response)=>{
              console.log('update success')
          })
        }else{
          this.OnlineTestingService.insert_choice(this.asr_id,qt_id,choice_id,this.result).subscribe((response)=>{
              console.log('insert success')
          })
        }
      })
    })
    
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

  async cancel() {
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

}
