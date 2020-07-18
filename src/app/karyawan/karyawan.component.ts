import { Component, OnInit } from '@angular/core';
//Service
import { KaryawanService } from '../karyawan.service';
//Array
import { KaryawanArray } from '../karyawan/karyawanarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertsService} from '@jaspero/ng-alerts';

declare var $:any;

@Component({
  selector: 'app-karyawan',
  templateUrl: './karyawan.component.html',
  styleUrls: ['./karyawan.component.css']
})
export class KaryawanComponent implements OnInit {
  items:KaryawanArray[]=[];
  id:any;
  nama:String;
  alamat:String;
  notelp:String;
  gajipokok:any;
  txtcari:String;
  tombol:String;

  karyawanForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };

  constructor(public route:ActivatedRoute, public router:Router,public karyawanservice:KaryawanService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.karyawanForm = this.formBuilder.group({
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      notelp: ['', [Validators.required]],
      gajipokok: ['', [Validators.required]]
    });
    this.spinner.show();
    this.karyawanservice.showkaryawan().subscribe(
      //Jika data sudah berhasil di load
      (data:KaryawanArray[])=>{
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
  get f() { return this.karyawanForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.karyawanForm.invalid) {
      return;
    }
    this.simpan();
  }

  cari(){
    //this.spinner.show();
    this.karyawanservice.searchkaryawan(new KaryawanArray(this.id,this.txtcari,this.alamat,this.notelp,this.gajipokok)).subscribe(
      //Jika data sudah berhasil di load
      (data:KaryawanArray[])=>{
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
      this.karyawanservice.savekaryawan(new KaryawanArray(this.id,this.nama,this.alamat,this.notelp,this.gajipokok))
      .subscribe(
        (data:KaryawanArray[])=>{
          this.open('success','Data Karyawan','Simpan Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Karyawan','Simpan Data Gagal!');
          this.spinner.hide();
        },
        function(){
        }
      );
    }
    else if(this.tombol == "edit"){
      this.karyawanservice.editkaryawan(new KaryawanArray(this.id,this.nama,this.alamat,this.notelp,this.gajipokok))
      .subscribe(
        (data:KaryawanArray[])=>{
          this.open('success','Data Karyawan','Edit Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Karyawan','Edit Data Gagal!');
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
    this.notelp = '';
    this.gajipokok = '';
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
      this.notelp = item.notelp;
      this.gajipokok = item.gajipokok;
      this.tombol = "edit";
      $('#responsive-modal').modal('show');
    },500);
  }

  hapus(item){
    /**/
    let konfirmasi = confirm("Anda yakin menghapus data?");
    if(konfirmasi == true){
      this.spinner.show();
      this.karyawanservice.deletekaryawan(item).subscribe(
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
