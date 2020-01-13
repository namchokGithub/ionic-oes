import { Component, OnInit } from "@angular/core";
import { OnlineTestingService } from "src/app/api/online-testing.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-list-testing",
  templateUrl: "./list-testing.page.html",
  styleUrls: ["./list-testing.page.scss"]
})
export class ListTestingPage implements OnInit {
  public listtest: any[];
  public subject: any[];
  private name_subject: string;
  private type_exam: number;
  private type_exam_name: string;
  private hide = false;

  constructor(
    public OnlineTestingService: OnlineTestingService,
    public router: Router
  ) {
    this.get_testing();
    this.get_subject();
  }

  ngOnInit() {}

  get_subject() {
    this.OnlineTestingService.get_subject_name().subscribe(response => {
      this.subject = response;
    });
  }

  get_testing() {
    this.OnlineTestingService.get_list_testing().subscribe(response => {
      this.listtest = response;
    });
  }

  onGoToNextPage(id: number) {
    this.router.navigate(["/detail-testing"], {
      queryParams: {
        asg_id: id
      }
    });
  }

  check() {
    // console.log(this.name_subject)
    // console.log(this.type_exam)
    if (this.type_exam!=null && this.name_subject!=null) {
      this.hide = true;
      if (this.type_exam == 1) this.type_exam_name = "(เก็บคะแนน)";
      else if (this.type_exam == 2) this.type_exam_name = "(กลางภาค)";
      else if (this.type_exam == 3) this.type_exam_name = "(ปลายภาค)";
    } else {
      this.hide = false;
    }
  }
}
