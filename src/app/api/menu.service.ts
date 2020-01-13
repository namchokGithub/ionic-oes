import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private name : string = "";
  private site_img : string = "https://image.flaticon.com/icons/svg/145/145849.svg";

  constructor(private http: Http) { }

  get_name(){
    return this.name
  }

  set_name(name: any){
    this.name = name
  }

  get_site_img(){
    return this.site_img
  }

  set_site_img(site: any){
    this.site_img = site
  }

  insert(fname: string, lastName: string, username: string, password: string){
    return this.http.get('http://localhost:3000/user/insert_user/'+username+'/'+password+'/'+fname+'/'+lastName+'/'+1).pipe(map(res => res.json()))
  }

  delete(id: number) {
    return this.http.get('http://localhost:3000/user/delete_information_user/'+id).pipe(map(res => res.json()))
  }

  getAllUser() {
    return this.http.get('http://localhost:3000/user/get_user_all').pipe(map(res => res.json()))
  }
  
}
