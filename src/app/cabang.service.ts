import { Injectable } from '@angular/core';
//Array
import { CabangArray } from '../app/cabang/cabangarray';
import { CabangStokArray } from '../app/cabang/cabangstokarray';
//HTTP Response
//Tambahkan Response,Request,Header
import { Http,Response,RequestOptions,Headers } from '@angular/http';

//Tambahkan Obervable
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CabangService {
  private items:CabangArray[]=[];
  private items2:CabangStokArray[]=[];
  private url:string="http://localhost:8000/cabang";
  private url2:string="http://localhost:8000/pusat";
  private url3:string="http://localhost:8000/semuatoko";
  constructor(public http: Http) { 

  }
  showall()
  {
    return this.http.get(this.url3).pipe(
      map((response:Response)=>response.json())
    );
  }
  showpusat()
  {
    return this.http.get(this.url2).pipe(
      map((response:Response)=>response.json())
    );
  }
  showcabang()
  {
    return this.http.get(this.url).pipe(
      map((response:Response)=>response.json())
    );
  }
  showstokcabang(id)
  {
    return this.http.get(this.url+"/stok/"+id).pipe(
      map((response:Response)=>response.json())
    );
  }
  showstokcabangbycat(id,idcat)
  {
    return this.http.get(this.url+"/stok/"+id+"/kategori/"+idcat).pipe(
      map((response:Response)=>response.json())
    );
  }
  showstokcabangbymerk(id,idmerk)
  {
    return this.http.get(this.url+"/stok/"+id+"/merk/"+idmerk).pipe(
      map((response:Response)=>response.json())
    );
  }
  searchcabang(item:CabangArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url+"/cari",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  searchstokcabang(item:CabangArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url+"/stok/cari",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  savecabang(item:CabangArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  editcabang(item:CabangArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url,
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  editstokcabang(item:CabangStokArray){
    let body = JSON.stringify(item);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.put(this.url + "/stok",
                  body, options)
                 .pipe(map((response:Response)=>response.json()));
  }
  deletecabang(item){
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.delete(this.url + "/hapus/" + item.id,
                  options)
                 .pipe(map((response:Response)=>response.json()));
  }
}
