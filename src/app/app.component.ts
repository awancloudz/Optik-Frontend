import { Component } from '@angular/core';
//Service
import { KategoriProdukService } from './kategori-produk.service';
import { PenggunaService } from './pengguna.service';
//Array
import { KategoriProdukArray } from './kategori-produk/kategori-produkarray';
import { PenggunaArray } from './pengguna/penggunaarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '@jaspero/ng-alerts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  kategori:KategoriProdukArray[]=[];
  pengguna:PenggunaArray[]=[];
  loginstatus = localStorage.getItem('loginstatus');
  id:any;
  id_profile:any;
  name:String;
  username:String;
  password:String;
  level:any;
  pesan:any;
  penggunaForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: true,
    duration: 2000
  };

  constructor(public kategoriprodukservice:KategoriProdukService,public route:ActivatedRoute, public router:Router,
    public penggunaservice:PenggunaService,private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService){

  }

  ngOnInit(){
    window.scrollTo(0, 0);
    if(this.loginstatus != null){
      this.spinner.show();
      this.kategoriprodukservice.showkategoriproduk().subscribe(
        //Jika data sudah berhasil di load
        (data:KategoriProdukArray[])=>{
          this.kategori=data;
          this.spinner.hide();
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );
      this.pengguna = JSON.parse(localStorage.getItem("profileuser"));
      if(this.pengguna.length > 0){
        this.level = this.pengguna[0].level;
        this.id_profile = this.pengguna[0].id_profile;
      }
    }
    else{
      this.penggunaForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', [Validators.required]],
      });
    }
  }
  get f() { return this.penggunaForm.controls; }
  
  onSubmit() {
      this.submitted = true;
      if (this.penggunaForm.invalid) {
        return;
      }
      this.login();
  }

  login(){
    this.spinner.show();
    this.penggunaservice.loginuser(new PenggunaArray(this.id,this.id_profile,this.name,this.username,this.password,this.level))
    .subscribe(
      (data:PenggunaArray[])=>{
        if((data[0].username != null) && (data[0].password != null)){
        this.pengguna = data;
        localStorage.setItem("profileuser", JSON.stringify(data));
        localStorage.setItem('loginstatus', 'login');
        this.pesan = "benar";
        location.reload();
        }
        else{
          this.pesan = "salah";
        }
        this.spinner.hide();
      },
      function(error){
        this.spinner.hide();
      },
      function(){
      }
    );
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/');
    setTimeout(() => {
      location.reload();
    },3000);
  }

  open(type,judul,pesan) {
    this._alert.create(type, judul, pesan, this.AlertSettings);
  }
}
