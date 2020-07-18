import { Component, OnInit } from '@angular/core';
//Service
import { MerkService } from '../merk.service';
import { KategoriProdukService } from '../kategori-produk.service';
//Array
import { MerkArray } from '../merk/merkarray';
import { KategoriProdukArray } from '../kategori-produk/kategori-produkarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertsService} from '@jaspero/ng-alerts';

declare var $:any;

@Component({
  selector: 'app-merk',
  templateUrl: './merk.component.html',
  styleUrls: ['./merk.component.css']
})
export class MerkComponent implements OnInit {
  items:MerkArray[]=[];
  kategori:KategoriProdukArray[]=[];
  id:any;
  nama:String;
  id_kategoriproduk:any;
  keterangan:String;
  txtcari:String;
  tombol:String;

  merkForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router, public merkservice:MerkService,public kategoriprodukservice:KategoriProdukService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { 

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.merkForm = this.formBuilder.group({
      nama: ['', Validators.required],
      id_kategoriproduk: ['', Validators.required],
      keterangan: ['', Validators.nullValidator],
    });
    this.spinner.show();
    this.merkservice.showmerk().subscribe(
      //Jika data sudah berhasil di load
      (data:MerkArray[])=>{
        this.items=data;
      },
      //Jika Error
      function (error){  
        this.spinner.hide(); 
      },
      //Tutup Loading
      function(){
      }
    );
    this.kategoriprodukservice.showkategoriproduk().subscribe(
      //Jika data sudah berhasil di load
      (datakategori:KategoriProdukArray[])=>{
        this.kategori=datakategori;
        this.spinner.hide();
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );
  }

  get f() { return this.merkForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.merkForm.invalid) {
      return;
    }
    this.simpan();
  }

  cari(){
    //this.spinner.show();
    this.merkservice.searchmerk(new MerkArray(this.id,this.txtcari,this.id_kategoriproduk,this.keterangan)).subscribe(
      //Jika data sudah berhasil di load
      (data:MerkArray[])=>{
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
      this.merkservice.savemerk(new MerkArray(this.id,this.nama,this.id_kategoriproduk,this.keterangan))
      .subscribe(
        (data:MerkArray[])=>{
          this.open('success','Data Merk Produk','Simpan Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Merk Produk','Simpan Data Gagal!');
          this.spinner.hide();
        },
        function(){
  
        }
      );
    }
    else if(this.tombol == "edit"){
      this.merkservice.editmerk(new MerkArray(this.id,this.nama,this.id_kategoriproduk,this.keterangan))
      .subscribe(
        (data:MerkArray[])=>{
          this.open('success','Data Merk Produk','Edit Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Merk Produk','Edit Data Gagal!');
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
    this.id_kategoriproduk = '';
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
      this.id_kategoriproduk = item.id_kategoriproduk;
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
      this.merkservice.deletemerk(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Data Merk Produk','Hapus Data Sukses!');
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
