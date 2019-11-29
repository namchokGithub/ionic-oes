import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewTestingService {

  constructor(private http: Http) { }

  get_subject() {
    return this.http.get("https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_review/get_subject").pipe(map(res => res.json()))
  }

  show_result_exam_student(crsId: number, Year: number, dfe_tm_id: number) {
    return this.http.get("https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_review/show_result_exam_student/" + crsId + "/" + Year + "/" + dfe_tm_id).pipe(map(res => res.json()))
  }
}
