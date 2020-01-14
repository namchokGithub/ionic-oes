import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ExamServiceService } from "src/app/api/exam-service.service";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  private crsId: number;
  private rs_subject: []
  private rs_exam: []
 
  private hide: boolean = false

  constructor(
    private ExamServiceService: ExamServiceService,
    private navCtrl: NavController, 
    public alertController: AlertController,
    public activatedRoute: ActivatedRoute, 
    public router: Router
    ) { }

  ngOnInit() {
    this.get_subject_all()
    
  }

  // Add subject item
  async addItem() {
    const alert = await this.alertController.create({
      header: "ต้องการสร้างชุดข้อสอบ",
      // message: "ยืนยันการสมัคร",
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
            this.navCtrl.navigateRoot(["/item"]);
          }
        }
      ]
    });
    await alert.present();
  }

  async delete_exam(ib_id:number) {
    const alert = await this.alertController.create({
      header: "ต้องการลบชุดข้อสอบ",
      // message: "ยืนยันการสมัคร",
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
            this.ExamServiceService.delete_pers_item_bank(ib_id).subscribe((res) => {
              this.get_exam_all()
            });
          }
        }
      ]
    });
    await alert.present();
  }

  get_subject_all() {
    this.ExamServiceService.get_subject_all().subscribe((res) => {
      console.log(res)
      this.rs_subject = res
    });
  }

  get_exam_all(){
    this.ExamServiceService.get_pers_item_bank(this.crsId).subscribe((res) => {
      console.log(res)
      this.rs_exam = res
    });
  }

  searchSubject(){
    console.log(this.crsId);
    this.get_exam_all()
    this.hide = true
  }

  edit(ib_id:number){
    console.log(ib_id)
    this.onGoeditpage(ib_id)
  }

  delete(ib_id:number){
    console.log(ib_id)
  }

  onGoeditpage(ib_id:number) {
    this.router.navigate(['/edit'], {
      queryParams: {
        ib_id: ib_id
      }
    });
  }
}
