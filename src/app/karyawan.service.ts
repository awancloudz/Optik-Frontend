import { Injectable } from '@angular/core';
// Array
import { KaryawanArray } from '../app/karyawan/karyawanarray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';

//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KaryawanService {
  private items:KaryawanArray[]=[];
  private url:string="http://localhost:8000/karyawan";
  constructor(public http: Http) { }
  showkaryawan()
  {
    return this.http.get(this.url).pipe(
      map((response:Response)=>response.json())
    );
  }
  searchkaryawan(item:KaryawanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url+"/cari",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  savekaryawan(item:KaryawanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  editkaryawan(item:KaryawanArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  deletekaryawan(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url + "/hapus/" + item.id,
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
