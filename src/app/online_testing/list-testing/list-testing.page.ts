import { Component, OnInit } from '@angular/core';
import { OnlineTestingService } from 'src/app/api/online-testing.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-testing',
  templateUrl: './list-testing.page.html',
  styleUrls: ['./list-testing.page.scss'],
})
export class ListTestingPage implements OnInit {

  public listtest: any[]
  public subject: any[]
  private name_subject: string
  private type_exam: number

  constructor(public OnlineTestingService: OnlineTestingService, public router: Router) {
    this.get_testing()
    this.get_subject()
  }

  ngOnInit() {

  }

  get_subject() {
    this.OnlineTestingService.get_subject().subscribe((response) => {
      this.subject = response
      console.log(response)
    });
  }

  get_testing() {
    this.OnlineTestingService.getTesting().subscribe((response) => {
      this.listtest = response;
      console.log(response)
    });
  }
  
  onGoToNextPage(id: number) {
    this.router.navigate(['/detail-testing'], {
      queryParams: {
        asg_id: id
      }
    });
  }

  con() {
    console.log(this.name_subject)
  }

  test(){
    console.log(this.name_subject)
    console.log(this.type_exam)
  }

}
