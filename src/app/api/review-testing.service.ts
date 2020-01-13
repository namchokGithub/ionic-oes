import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewTestingService {

  constructor(private http: Http) { }

  get_year(){
    return this.http.get('http://localhost:3000/oes/get_year/1').pipe(map(res => res.json()))
  }

  get_subject() {
    return this.http.get('http://localhost:3000/srp/get_Course/1').pipe(map(res => res.json()))
  }

  show_result_exam_student(search_dfe_year: string='', search_dfe_tm_id: string='',search_ib_sub_id:string ='') {
    return this.http.get("http://localhost:3000/oes/get_result_student/1/" + search_dfe_year + "/" + search_dfe_tm_id + "/" + search_ib_sub_id).pipe(map(res => res.json()))
  }
}
