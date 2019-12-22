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
      this.ReviewTestingService.show_result_exam_student(
        this.crsId,
        this.Year,
        this.crs_term
      ).subscribe(result => {
        this.rs_result_exam_student = result;
        this.hide = true;
        // console.log(this.rs_result_exam_student)
      });
    }
  }
}
