import { Component, OnInit } from '@angular/core';
//Service
import { KategoriProdukService } from '../kategori-produk.service';
//Array
import { KategoriProdukArray } from '../kategori-produk/kategori-produkarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertsService} from '@jaspero/ng-alerts';

declare var $:any;

@Component({
  selector: 'app-kategori-produk',
  templateUrl: './kategori-produk.component.html',
  styleUrls: ['./kategori-produk.component.css']
})
export class KategoriProdukComponent implements OnInit {
  items:KategoriProdukArray[]=[];
  id:any;
  nama:String;
  keterangan:String;
  txtcari:String;
  tombol:String;

  kategoriForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router, public kategoriprodukservice:KategoriProdukService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { 

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.kategoriForm = this.formBuilder.group({
      nama: ['', Validators.required],
      keterangan: ['', Validators.nullValidator],
    });
    this.spinner.show();
    this.kategoriprodukservice.showkategoriproduk().subscribe(
      //Jika data sudah berhasil di load
      (data:KategoriProdukArray[])=>{
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

  get f() { return this.kategoriForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.kategoriForm.invalid) {
      return;
    }
    this.simpan();
  }

  cari(){
    //this.spinner.show();
    this.kategoriprodukservice.searchkategoriproduk(new KategoriProdukArray(this.id,this.txtcari,this.keterangan)).subscribe(
      //Jika data sudah berhasil di load
      (data:KategoriProdukArray[])=>{
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
      this.kategoriprodukservice.savekategoriproduk(new KategoriProdukArray(this.id,this.nama,this.keterangan))
      .subscribe(
        (data:KategoriProdukArray[])=>{
          this.open('success','Data Kategori Produk','Simpan Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Kategori Produk','Simpan Data Gagal!');
          this.spinner.hide();
        },
        function(){
  
        }
      );
    }
    else if(this.tombol == "edit"){
      this.kategoriprodukservice.editkategoriproduk(new KategoriProdukArray(this.id,this.nama,this.keterangan))
      .subscribe(
        (data:KategoriProdukArray[])=>{
          this.open('success','Data Kategori Produk','Edit Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Kategori Produk','Edit Data Gagal!');
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
    this.nama = '';
    this.keterangan = '';
  }

  tambah(){
    $('#responsive-modal').modal('show');
    this.tombol = "tambah";
    this.kosongfield();
  }

  edit(item){
    setTimeout(() => {
      this.id = item.id;
      this.nama = item.nama;
      this.keterangan = item.keterangan;
      this.tombol = "edit";
      $('#responsive-modal').modal('show');
    },500);
  }

  hapus(item){
    /**/
    let konfirmasi = confirm("Anda yakin menghapus data?");
    if(konfirmasi == true){
      this.spinner.show();
      this.kategoriprodukservice.deletekategoriproduk(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Data Kategori Produk','Hapus Data Sukses!');
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
