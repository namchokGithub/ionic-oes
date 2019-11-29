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
    
  }

  get_subject() {

    console.log('เข้าฟังก์ชันแล้ว')

    this.ReviewTestingService.get_subject().subscribe(result => {
      this.rs_subject = result.rs_subject
      this.rs_year = result.rs_year

      console.log("ดึงข้อมูลวิชา(สำเร็จ)")
      console.log(this.rs_subject)
      console.log(this.rs_year)

    })

  }

  show_result_exam_student() {


    this.ReviewTestingService.show_result_exam_student(this.crsId, this.Year, this.crs_term).subscribe(result => {
      this.rs_result_exam_student = result.rs_result_exam_student
      console.log("ดึงผลการสอบ(สำเร็จ)")
      console.log(this.rs_result_exam_student)
     
    })

  }
}
