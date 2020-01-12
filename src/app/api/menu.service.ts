import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private name : string = "ชื่อผู้ใช้งาน";
  private site_img : string = "https://image.flaticon.com/icons/svg/145/145849.svg";

  constructor() { }

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
  
}
