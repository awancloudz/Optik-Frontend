import { Injectable } from '@angular/core';
//StokPusat Array
import { StokPusatArray } from '../app/stok-pusat/stok-pusatarray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';

//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StokPusatService {
  private items:StokPusatArray[]=[];
  private url:string="http://localhost:8000/stok-pusat/kategori/";
  private url2:string="http://localhost:8000/stok-pusat";
  constructor(public http: Http) { }
  showall(){
    return this.http.get(this.url2).pipe(
      map((response:Response)=>response.json())
    );
  }
  showstokpusat(id)
  {
    return this.http.get(this.url + id).pipe(
      map((response:Response)=>response.json())
    );
  }
  searchstokpusat(item:StokPusatArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url2+"/cari",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  searchbarcode(item:StokPusatArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url2+"/caribarcode",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  searchbarcodecabang(item:StokPusatArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url2+"/caribarcodecabang",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  savestokpusat(item:StokPusatArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  editstokpusat(item:StokPusatArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url2,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  deletestokpusat(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url2 + "/hapus/" + item.id,
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
