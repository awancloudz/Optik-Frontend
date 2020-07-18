import { Injectable } from '@angular/core';
//Array
import { MerkArray } from '../app/merk/merkarray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';

//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerkService {
  private items:MerkArray[]=[];
  private url:string="http://localhost:8000/merk";
  constructor(public http: Http) { }
  showmerk(){
    return this.http.get(this.url).pipe(
      map((response:Response)=>response.json())
    );
  }
  searchmerk(item:MerkArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url+"/cari",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  showbycat(id){
    return this.http.get(this.url + "/kategori/" + id).pipe(
      map((response:Response)=>response.json())
    );
  }
  showbymerk(id){
    return this.http.get(this.url + "/" + id).pipe(
      map((response:Response)=>response.json())
    );
  }
  savemerk(item:MerkArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  editmerk(item:MerkArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  deletemerk(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url + "/hapus/" + item.id,
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
