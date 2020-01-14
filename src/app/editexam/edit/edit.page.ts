import { Component, OnInit } from '@angular/core';
import { AlertController,MenuController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamServiceService } from "src/app/api/exam-service.service";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  private ib_code:string
  private ib_id:number
  private ib_name:string
  private ib_sub_id:number
  private ib_stem_amount:number 
  private ib_option_amount:number
  private ib_question_insert:[]
  private ib_question:[]
  private rs_subject:[]
  private sub_name: string

  constructor(
    private menuCtrl: MenuController,
    private loadingController: LoadingController, 
    private navCtrl: NavController, 
    public activatedRoute: ActivatedRoute, 
    public router: Router,
    private examServiceService:ExamServiceService,
    private alertController:AlertController
    ) { 
    this.activatedRoute.queryParams.subscribe((res) => {
        this.ib_id = res.ib_id
    });
  }

  ngOnInit() {
    // console.log(this.ib_id)
    this.examServiceService.get_pers_item_bank_by_id(this.ib_id).subscribe((res) => {
      console.log(res)
      this.ib_code = res[0].ib_code
      this.ib_name = res[0].ib_name
      this.ib_sub_id = res[0].ib_sub_id
      this.ib_stem_amount = res[0].ib_stem_amount
      this.ib_option_amount = res[0].ib_option_amount
    });
    this.get_subject_all()
  }

  get_subject_all() {
    this.examServiceService.get_subject_all().subscribe((res) => {
      this.rs_subject = res
      // console.log(this.rs_subject)
      for(let i=0;i<this.rs_subject.length;i++) {
        if(this.ib_sub_id==this.rs_subject[i].sub_id) {
          this.sub_name = this.rs_subject[i].sub_code_th + this.rs_subject[i].sub_name_th
        }
      }
    });
  }

  async edit_Exam(){
    const alert = await this.alertController.create({
      header:  `ยืนยันการแก้ชุดข้อสอบ`,
      message: `ข้อสอบ ${this.ib_name} <br>
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
            this.examServiceService.update_pers_item_bank(this.ib_code,this.ib_name,this.ib_sub_id,this.ib_stem_amount,this.ib_option_amount,this.ib_id).subscribe((res) => {
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
