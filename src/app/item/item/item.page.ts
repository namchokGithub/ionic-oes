import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ExamServiceService } from "src/app/api/exam-service.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  private ib_code:string
  private ib_name:string
  private ib_sub_id:number
  private ib_stem_amount:number 
  private ib_option_amount:number
  private ib_question_insert:[]
  private ib_question:[]
  private rs_subject:[]
  constructor(
    private examServiceService: ExamServiceService,
    private navCtrl: NavController, 
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute, 
    public router: Router
  ) { }

  ngOnInit() {
    this.get_subject_all()
    this.get_question_all()
  }

  get_subject_all() {
    this.examServiceService.get_subject_all().subscribe((res) => {
      console.log(res)
      this.rs_subject = res
    });
  }

  get_question_all(){
    this.examServiceService.get_pers_question_all().subscribe((res) => {
      console.log(res)
      this.ib_question = res
    });
  }

  async save_Exam(){
    const alert = await this.alertController.create({
      header:  `ยืนยันการสร้างชุดข้อสอบ`,
      message: ` รหัสชุดข้อสอบ ${this.ib_code} <br>
                 ชื่อชุดข้อสอบ ${this.ib_name} <br>
                 จำนวน ${this.ib_stem_amount} ข้อ`,
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "ยืนยัน",
          role: "submit",
          cssClass: "secondary",
          handler: () => {
            console.log(this.ib_question_insert)
            this.examServiceService.insert_pers_item_bank(this.ib_code,this.ib_name,this.ib_sub_id,this.ib_stem_amount,this.ib_option_amount).subscribe((res) => {
              this.router.navigate(['/admin'])
            });
          }
        }
      ]
    });
    await alert.present();
  }
 
  async cancle_Exam(){
    const alert = await this.alertController.create({
      header: "ยกเลิกการแก้ไข",
      //message: "ยกเลิกการแก้ไข",
      buttons: [
        {
          text: "ยกเลิก",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "ยืนยัน",
          role: "submit",
          cssClass: "secondary",
          handler: () => {
              this.router.navigate(['/admin'])          
          }
        }
      ]
    });
    await alert.present();
  }
}
