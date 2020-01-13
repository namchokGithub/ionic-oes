import { Component, OnInit } from "@angular/core";
import { ReviewTestingService } from "src/app/api/review-testing.service";
import { ToastController } from "@ionic/angular";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-review-student",
  templateUrl: "./review-student.page.html",
  styleUrls: ["./review-student.page.scss"]
})
export class ReviewStudentPage implements OnInit {
  private crsId: number;
  private Year: number;
  private crs_term: number;
  private search_dfe_year:string
  private search_dfe_tm_id:string
  private search_ib_sub_id:string
  private rs_year: [];
  private rs_subject: [];
  private rs_result_exam_student: [];

  private hide = false;

  constructor(
    private ReviewTestingService: ReviewTestingService,
    public toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.get_subject();
    // this.show_result_exam_student()
  }

  get_subject() {
    this.ReviewTestingService.get_subject().subscribe(result => {
      this.rs_subject = result.rs_subject;
      this.rs_year = result.rs_year;
    });
  }

  async show_result_exam_student() {
    if (this.crsId == null) {
      const alert = await this.alertController.create({
        message: 'กรุณาเลือกวิชา',
        buttons: ['OK']
      });
      alert.present();
      console.log("NULL");
    } else {
      this.search_dfe_year = this.Year != null ? 'AND tsp60_nu_oesdb.oes_define_exam.dfe_year = '+ this.Year : ' ';
      this.search_dfe_tm_id = this.crs_term != null ? 'AND tsp60_nu_oesdb.oes_define_exam.dfe_tm_id = '+ this.crs_term : ' ';
      this.search_ib_sub_id = this.crsId != null ? 'AND tsp60_nu_persdb.pers_item_bank.ib_sub_id = '+ this.crsId : ' ';
      this.ReviewTestingService.show_result_exam_student(
        this.search_dfe_year,
        this.search_dfe_tm_id,
        this.search_ib_sub_id
      ).subscribe((response) => {
        console.log(response);
        this.rs_result_exam_student = response
        this.hide = true;
        // console.log(this.rs_result_exam_student)
      });
    }
  }
}
