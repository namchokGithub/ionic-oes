import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OnlineTestingService {

  constructor(public http: Http) {

  }

  get_subject() {
    return this.http.get('https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_online_testing/get_subject_name').pipe(map(res => res.json()));
  }

  getTesting() {
    return this.http.get('https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_online_testing/get_list_testing').pipe(map(res => res.json()));
  }

  get_detail_testing(asg_id: number) {
    return this.http.get('https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_online_testing/show_detail_test/' + asg_id).pipe(map(res => res.json()));
  }

  get_qestion(asg_id: number) {
    return this.http.get('https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_online_testing/get_qestion/' + asg_id).pipe(map(res => res.json()));
  }

  insert_choice(choice_id: number, qt_id: number, asr_id: number) {
    return this.http.get('https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_online_testing/save_result/' + choice_id + '/' + qt_id + '/' + asr_id).pipe(map(res => res.json()));
  }

  update_end_testing(asr_id: number) {
    return this.http.get('https://10.80.39.17/TSP60/Thepd-nu/index.php/oes/API/Api_online_testing/update_end_testing/' + asr_id).pipe(map(res => res.json()));
  }

}
