import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ExamServiceService {

  constructor(private http:Http) { }

  insert_pers_item_bank(ib_code:string,ib_name:string,ib_sub_id:number,ib_stem_amount:number,ib_option_amount:number){
    return this.http.get('http://localhost:3000/pers/insert_pers_item_bank/'+ib_code+'/'+ib_name+'/'+ib_sub_id+'/'+ib_stem_amount+'/'+ib_option_amount+'/1/1/1').pipe(map(res => res.json()))
  }
  get_pers_item_bank(ib_sub_id:number){
    return this.http.get('http://localhost:3000/pers/get_pers_item_bank/'+ib_sub_id).pipe(map(res => res.json()))
  }
  get_pers_item_bank_by_id(ib_id:number){
    return this.http.get('http://localhost:3000/pers/get_pers_item_bank_by_id/'+ib_id).pipe(map(res => res.json()))
  }

  delete_pers_item_bank(ib_id:number){
    return this.http.get('http://localhost:3000/pers/delete_pers_item_bank/'+ib_id).pipe(map(res => res.json()))
  }

  update_pers_item_bank(ib_code:number,ib_name:string,ib_sub_id:string,ib_stem_amount:number,ib_option_amount:string,ib_id:number){
    return this.http.get('http://localhost:3000/pers/update_pers_item_bank/'+ib_code+'/'+ib_name+'/'+ib_sub_id+'/'+ib_stem_amount+'/'+ib_option_amount+'/'+ib_id).pipe(map(res => res.json()))
  }
  
  get_subject_all(){
    return this.http.get('http://localhost:3000/pers/get_subject_all').pipe(map(res => res.json()))
  }

  get_pers_question_all(){
    return this.http.get('http://localhost:3000/pers/get_pers_question_all').pipe(map(res => res.json()))
  }

  insert_stem(stem_sequence:number,stem_qt_id:number,stem_ib_id:number){
    return this.http.get('http://localhost:3000/pers/check_user/'+stem_sequence+'/'+stem_qt_id+'/'+stem_ib_id).pipe(map(res => res.json()))
  }
}
