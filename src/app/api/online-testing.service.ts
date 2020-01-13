import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OnlineTestingService {

  constructor(public http: Http) {

  }

  get_student(stuId: any) {
    return this.http.get('https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_online_testing/get_student/' + stuId).pipe(map(res => res.json()))
  }

  get_subject_name() {
    return this.http.get('http://localhost:3000/oes/get_subject_name').pipe(map(res => res.json()))
  }

  get_list_testing() {
    return this.http.get('http://localhost:3000/oes/get_list_testing/1/1').pipe(map(res => res.json()))
  }
  
  get_detail_testing(asg_id: number) {
    return this.http.get('http://localhost:3000/oes/get_detail_test/1/' + asg_id).pipe(map(res => res.json()))
  }

  insert_ass(asg_id:number){
    return this.http.get('http://localhost:3000/oes/insert_assessor/'+ asg_id +'/'+ asg_id +'/'+ asg_id +'/'+ asg_id).pipe(map(res => res.json()))
  }

  validation(asg_id:number){
    return this.http.get('http://localhost:3000/oes/get_validation/' + asg_id).pipe(map(res => res.json()))
  }

  get_list_qestion(asg_id:number){
    return this.http.get('http://localhost:3000/oes/get_list_question/'+ asg_id +'/'+ asg_id).pipe(map(res => res.json()))
  }

  get_list_choice(asg_id:number){
    return this.http.get('http://localhost:3000/oes/get_list_choices/'+ asg_id +'/'+ asg_id).pipe(map(res => res.json()))
  }

  get_time_testing(asg_id:number){
    return this.http.get('http://localhost:3000/oes/get_time_testing/'+ asg_id).pipe(map(res => res.json()))
  }
  
  get_score(choice_id:number){
    return this.http.get('http://localhost:3000/pers/check_result/'+ choice_id).pipe(map(res => res.json()))
  }

  check_insert(qt_id:number,asr_id:number){
    return this.http.get('http://localhost:3000/oes/check_insert/' + qt_id + '/' + asr_id).pipe(map(res => res.json()));
  }

  insert_choice(asr_id:number,qt_id:number,choice_id:number,result:number){
    return this.http.get('http://localhost:3000/oes/insert_result/'+ asr_id +'/'+ qt_id +'/'+ choice_id +'/'+ result).pipe(map(res => res.json()));
  }
  
  update_choice(choice_id:number,result:number,rse_id:number){
    return this.http.get('http://localhost:3000/oes/update_result/'+ choice_id +'/'+ result + '/'+rse_id).pipe(map(res => res.json()));
  }
  
  update_end_testing(asr_id: number) {
    return this.http.get('http://localhost:3000/oes/update_end_testing/' + asr_id).pipe(map(res => res.json()));
  }

}
