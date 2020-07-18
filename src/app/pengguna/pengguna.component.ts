import { Component, OnInit } from '@angular/core';
//Service
import { PenggunaService } from '../pengguna.service';
import { CabangService } from '../cabang.service';
//Array
import { PenggunaArray } from '../pengguna/penggunaarray';
import { CabangArray } from '../cabang/cabangarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertsService } from '@jaspero/ng-alerts';

declare var $:any;

@Component({
  selector: 'app-pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.css']
})
export class PenggunaComponent implements OnInit {
  lokasi:CabangArray[]=[];
  items:PenggunaArray[]=[];
  id:any;
  id_profile:any;
  name:String;
  username:String;
  password:String;
  level:any;
  txtcari:String;
  tombol:String;

  penggunaForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router,public penggunaservice:PenggunaService, public cabangservice:CabangService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { 

    }

  ngOnInit() {
      window.scrollTo(0, 0);
      this.penggunaForm = this.formBuilder.group({
        id_profile: ['', Validators.required],
        name: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', [Validators.required]],
        level: ['', [Validators.required]]
      });
      this.spinner.show();
      this.cabangservice.showall().subscribe(
        //Jika data sudah berhasil di load
        (data2:CabangArray[])=>{
          this.lokasi=data2;
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );
      
      this.penggunaservice.showpengguna().subscribe(
        //Jika data sudah berhasil di load
        (data:PenggunaArray[])=>{
          this.items=data;
          this.spinner.hide();
        },
        //Jika Error
        function (error){   
          this.spinner.hide();
        },
        //Tutup Loading
        function(){
        }
      );
  }

  get f() { return this.penggunaForm.controls; }
  
  onSubmit() {
      this.submitted = true;
      if (this.penggunaForm.invalid) {
        return;
      }
      this.simpan();
  }
  
  cari(){
      //this.spinner.show();
      this.penggunaservice.searchpengguna(new PenggunaArray(this.id,this.id_profile,this.txtcari,this.username,this.password,this.level)).subscribe(
        //Jika data sudah berhasil di load
        (data:PenggunaArray[])=>{
          this.items=data;
          //this.spinner.hide();
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );
  }
  
  simpan(){
    this.spinner.show();
  
    if(this.tombol == "tambah"){
      this.penggunaservice.savepengguna(new PenggunaArray(this.id,this.id_profile,this.name,this.username,this.password,this.level))
      .subscribe(
        (data:PenggunaArray[])=>{
          this.open('success','Data Pengguna','Simpan Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Pengguna','Simpan Data Gagal!');
          this.spinner.hide();
        },
        function(){
        }
      );
    }
    else if(this.tombol == "edit"){
      this.penggunaservice.editpengguna(new PenggunaArray(this.id,this.id_profile,this.name,this.username,this.password,this.level))
      .subscribe(
         (data:PenggunaArray[])=>{
          this.open('success','Data Pengguna','Edit Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Pengguna','Edit Data Gagal!');
          this.spinner.hide();
        },
        function(){
        }
      );
    }
    this.kosongfield();
    $('#responsive-modal').modal('hide');
  }
  
  kosongfield(){
    this.id = '';
    this.id_profile = 0;
    this.name = '';
    this.username = '';
    this.password = '';
    this.level = 0;
  }
  
  tambah(){
    $('#responsive-modal').modal('show');
    this.tombol = "tambah";
    this.kosongfield();
  }
  
  edit(item){
    setTimeout(() => {
      this.id = item.id;
      this.id_profile = item.id_profile;
      this.name = item.name;
      this.username = item.username;
      //this.password = item.password;
      this.level = item.level;
      this.tombol = "edit";
      $('#responsive-modal').modal('show');
    },500);
  }
  
  hapus(item){
    let konfirmasi = confirm("Anda yakin menghapus data?");
    if(konfirmasi == true){
      this.spinner.show();
      this.penggunaservice.deletepengguna(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Data Karyawan','Hapus Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        //Jika Error
        function (error){   
        },
        //Tutup Loading
        function(){
        }
      );
    } 
  }
  
  open(type,judul,pesan) {
    this._alert.create(type, judul, pesan, this.AlertSettings);
  }

}
