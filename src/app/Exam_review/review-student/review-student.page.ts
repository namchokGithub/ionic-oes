import { Component, OnInit } from '@angular/core';
import {ReviewTestingService} from 'src/app/api/review-testing.service'
@Component({
  selector: 'app-review-student',
  templateUrl: './review-student.page.html',
  styleUrls: ['./review-student.page.scss'],
})
export class ReviewStudentPage implements OnInit {

  private crsId: number;
  private Year: number;
  private crs_term: number;

  private rs_year: [];
  private rs_subject: [];
  private rs_result_exam_student: [];

  constructor(private ReviewTestingService:ReviewTestingService) { }

  ngOnInit() {
    this.get_subject()
    // this.show_result_exam_student()
  }

  get_subject() {

    this.ReviewTestingService.get_subject().subscribe(result => {
      console.log(result)
      this.rs_subject = result.rs_subject
      this.rs_year = result.rs_year
      console.log(this.rs_subject)
      console.log(this.rs_year)

    })

  }

  show_result_exam_student() {
    console.log('show_result_exam_student')
    this.ReviewTestingService.show_result_exam_student(this.crsId, this.Year, this.crs_term).subscribe(result => {
      this.rs_result_exam_student = result
      console.log(this.rs_result_exam_student)
    })

  }
}
