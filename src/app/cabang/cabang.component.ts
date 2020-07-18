import { Component, OnInit } from '@angular/core';
//Service
import { CabangService } from '../cabang.service';
import { KategoriProdukService } from '../kategori-produk.service';
import { MerkService } from '../merk.service';
//Array
import { CabangArray } from '../cabang/cabangarray';
import { CabangStokArray } from '../cabang/cabangstokarray';
import { KategoriProdukArray } from '../kategori-produk/kategori-produkarray';
import { MerkArray } from '../merk/merkarray';
import { PenggunaArray } from '../pengguna/penggunaarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertsService} from '@jaspero/ng-alerts';

declare var $:any;

@Component({
  selector: 'app-cabang',
  templateUrl: './cabang.component.html',
  styleUrls: ['./cabang.component.css']
})
export class CabangComponent implements OnInit {
  items:CabangArray[]=[];
  id:any;
  nama:String;
  alamat:String;
  kota:String;
  notelp:String;
  promosi:String;
  statustoko:String;
  txtcari:String;
  tombol:String;

  cabangForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router,public cabangservice:CabangService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cabangForm = this.formBuilder.group({
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      kota: ['', [Validators.required]],
      notelp: ['', [Validators.required]],
      promosi: ['', [Validators.nullValidator]]
    });
    this.spinner.show();
    this.cabangservice.showcabang().subscribe(
      //Jika data sudah berhasil di load
      (data:CabangArray[])=>{
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

  get f() { return this.cabangForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.cabangForm.invalid) {
      return;
    }
    this.simpan();
  }

  cari(){
    //this.spinner.show();
    this.cabangservice.searchcabang(new CabangArray(this.id,this.txtcari,this.alamat,this.kota,this.notelp,this.promosi,this.statustoko)).subscribe(
      //Jika data sudah berhasil di load
      (data:CabangArray[])=>{
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
    this.statustoko = "cabang";
    if(this.tombol == "tambah"){
      this.cabangservice.savecabang(new CabangArray(this.id,this.nama,this.alamat,this.kota,this.notelp,this.promosi,this.statustoko))
      .subscribe(
        (data:CabangArray[])=>{
          this.open('success','Data Cabang','Simpan Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Customer','Simpan Data Gagal!');
          this.spinner.hide();
        },
        function(){
  
        }
      );
    }
    else if(this.tombol == "edit"){
      this.cabangservice.editcabang(new CabangArray(this.id,this.nama,this.alamat,this.kota,this.notelp,this.promosi,this.statustoko))
      .subscribe(
        (data:CabangArray[])=>{
          this.open('success','Data Cabang','Edit Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Cabang','Edit Data Gagal!');
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
    this.alamat = '';
    this.kota = '';
    this.notelp = '';
    this.promosi = '';
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
      this.alamat = item.alamat;
      this.kota = item.kota;
      this.notelp = item.notelp;
      this.promosi = item.promosi;
      this.tombol = "edit";
      $('#responsive-modal').modal('show');
    },500);
  }

  hapus(item){
    /**/
    let konfirmasi = confirm("Anda yakin menghapus data?");
    if(konfirmasi == true){
      this.spinner.show();
      this.cabangservice.deletecabang(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Data Cabang','Hapus Data Sukses!');
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

@Component({
  selector: 'app-cabang',
  templateUrl: './cabang-utama.component.html',
  styleUrls: ['./cabang.component.css']
})
export class CabangUtamaComponent implements OnInit {
  items:CabangArray[]=[];
  id:any;
  nama:String;
  alamat:String;
  kota:String;
  notelp:String;
  promosi:String;
  statustoko:String;
  txtcari:String;
  tombol:String;

  cabangForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router,public cabangservice:CabangService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { 

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.cabangForm = this.formBuilder.group({
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      kota: ['', [Validators.required]],
      notelp: ['', [Validators.required]]
    });
    this.spinner.show();
    this.cabangservice.showpusat().subscribe(
      //Jika data sudah berhasil di load
      (data:CabangArray[])=>{
        this.items=data;
        if(data.length > 0){
          this.id = data[0].id;
          this.nama = data[0].nama;
          this.alamat = data[0].alamat;
          this.kota = data[0].kota;
          this.notelp = data[0].notelp;
        }
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

  get f() { return this.cabangForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.cabangForm.invalid) {
      return;
    }
    this.simpan();
  }

  simpan(){
    this.spinner.show();
    this.statustoko = "pusat";
    this.cabangservice.editcabang(new CabangArray(this.id,this.nama,this.alamat,this.kota,this.notelp,this.promosi,this.statustoko))
    .subscribe(
      (data:CabangArray[])=>{
        this.open('success','Profile Toko','Edit Data Sukses!');
        this.spinner.hide();
        setTimeout(() => {
        this.router.navigateByUrl("profile");
        },3000);
      },
      function(error){
        this.open('error','Profile Toko','Edit Data Gagal!');
        this.spinner.hide();
      },
      function(){
  
      }
    );
  }
  open(type,judul,pesan) {
    this._alert.create(type, judul, pesan, this.AlertSettings);
  }
}

@Component({
  selector: 'app-cabang',
  templateUrl: './cabang-stok.component.html',
  styleUrls: ['./cabang.component.css']
})
export class CabangStokComponent implements OnInit {
  items:CabangStokArray[]=[];
  kategori:KategoriProdukArray[]=[];
  merk:MerkArray[]=[];
  pengguna:PenggunaArray[]=[];
  id:any;
  nama:String;
  alamat:String;
  kota:String;
  notelp:String;
  promosi:String;
  statustoko:String;
  txtcari:String;
  tombol:String;
  pilihkategori:any;
  pilihmerk:any;

  idcabang:any;
  kodeproduk:any;
  id_kategoriproduk:any;
  id_merk:any;
  namaproduk:any;
  seriproduk:any;
  hargajual:any;
  hargagrosir:any;
  hargadistributor:any;
  diskon:any;
  stok:any;
  foto:any;

  level:String;

  stokcabangForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router,public cabangservice:CabangService,public kategoriprodukservice:KategoriProdukService,
    public merkservice:MerkService,private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { }

  ngOnInit() {
    this.spinner.show();
    this.pengguna = JSON.parse(localStorage.getItem("profileuser"));
    if(this.pengguna.length > 0){
      this.level = this.pengguna[0].level;
    }

    this.stokcabangForm = this.formBuilder.group({
      hargajual: ['', Validators.required],
      stok: ['', Validators.required],
    });

    this.idcabang = this.route.snapshot.paramMap.get('id');
    this.kategoriprodukservice.showkategoriproduk().subscribe(
      //Jika data sudah berhasil di load
      (datakategori:KategoriProdukArray[])=>{
        this.kategori=datakategori;
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );
    this.cabangservice.showstokcabang(this.idcabang).subscribe(
      //Jika data sudah berhasil di load
      (data:CabangStokArray[])=>{
        this.items=data;
        // $(".selectid_kategoriproduk").select2();
        // $(".selectid_merk").select2();
        this.pilihkategori = 0;
        this.pilihmerk = 0;
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

  get f() { return this.stokcabangForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.stokcabangForm.invalid) {
      return;
    }
    this.simpan();
  }

  cari(){
    //this.spinner.show();
    this.cabangservice.searchstokcabang(new CabangArray(this.idcabang,this.txtcari,this.alamat,this.kota,this.notelp,this.promosi,this.statustoko)).subscribe(
      //Jika data sudah berhasil di load
      (data)=>{
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

  carikategori(){
    this.spinner.show();
    var idcat = this.pilihkategori;
    if(idcat != 0){
      this.cabangservice.showstokcabangbycat(this.idcabang,idcat).subscribe(
        //Jika data sudah berhasil di load
        (data:CabangStokArray[])=>{
          this.items=data;
          //Tampilkan Merk
          this.merkservice.showbycat(idcat).subscribe(
            //Jika data sudah berhasil di load
            (datamerk:MerkArray[])=>{
              this.merk=datamerk;
              this.pilihmerk = 0;
            },
            //Jika Error
            function (error){   
            },
            //Tutup Loading
            function(){
            }
          );
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
    else{
      this.ngOnInit();
      this.merk = [];
      this.pilihmerk = 0;
    }
  }

  carimerk(){
    this.spinner.show();
    var idmerk = this.pilihmerk;
    this.cabangservice.showstokcabangbymerk(this.idcabang,idmerk).subscribe(
      //Jika data sudah berhasil di load
      (data:CabangStokArray[])=>{
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

  kosongfield(){
    this.id = '';
    this.hargajual = null;
    this.stok = null;
  }

  edit(item){
    setTimeout(() => {
      this.id = item.id;
      this.hargajual = item.hargajual;
      this.stok = item.stok;
      this.tombol = "edit";
      $('#responsive-modal').modal('show');
    },500);
  }

  simpan(){
    this.cabangservice.editstokcabang(new CabangStokArray(this.id,this.kodeproduk,this.id_kategoriproduk,this.id_merk,this.namaproduk,this.seriproduk,this.hargadistributor,this.hargagrosir,this.hargajual,this.diskon,this.stok,this.foto))
    .subscribe(
      (data:CabangStokArray[])=>{
        this.open('success','Data Produk','Edit Data Sukses!');
        this.spinner.hide();
        this.ngOnInit();
      },
      function(error){
        this.open('error','Data Produk','Edit Data Gagal!');
        this.spinner.hide();
      },
      function(){
  
      }
    );
    this.kosongfield();
    $('#responsive-modal').modal('hide');
  }

  open(type,judul,pesan) {
    this._alert.create(type, judul, pesan, this.AlertSettings);
  }
}

@Component({
  selector: 'app-cabang',
  templateUrl: './cabang-transaksi.component.html',
  styleUrls: ['./cabang.component.css']
})
export class CabangTransaksiComponent implements OnInit {

  constructor(public route:ActivatedRoute, public router:Router,public cabangservice:CabangService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { }

  ngOnInit() {
    var idcabang = this.route.snapshot.paramMap.get('id');
  }

}