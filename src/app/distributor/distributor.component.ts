import { Component, OnInit } from '@angular/core';
//Service
import { DistributorService } from '../distributor.service';
//Array
import { DistributorArray } from '../distributor/distributorarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertsService} from '@jaspero/ng-alerts';

declare var $:any;

@Component({
  selector: 'app-distributor',
  templateUrl: './distributor.component.html',
  styleUrls: ['./distributor.component.css']
})
export class DistributorComponent implements OnInit {
  items:DistributorArray[]=[];
  id:any;
  nama:String;
  alamat:String;
  notelp:String;
  jenis:String;
  txtcari:String;
  tombol:String;

  distributorForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router,public distributorservice:DistributorService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { 

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.distributorForm = this.formBuilder.group({
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      notelp: ['', [Validators.required]]
    });
    this.spinner.show();
    this.distributorservice.showdistributor().subscribe(
      //Jika data sudah berhasil di load
      (data:DistributorArray[])=>{
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

  get f() { return this.distributorForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.distributorForm.invalid) {
      return;
    }
    this.simpan();
  }

  cari(){
    //this.spinner.show();
    this.distributorservice.searchdistributor(new DistributorArray(this.id,this.txtcari,this.alamat,this.notelp,this.jenis)).subscribe(
      //Jika data sudah berhasil di load
      (data:DistributorArray[])=>{
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
    this.jenis = "distributor";

    if(this.tombol == "tambah"){
      this.distributorservice.savedistributor(new DistributorArray(this.id,this.nama,this.alamat,this.notelp,this.jenis))
      .subscribe(
        (data:DistributorArray[])=>{
          this.open('success','Data Distributor','Simpan Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Distributor','Simpan Data Gagal!');
          this.spinner.hide();
        },
        function(){
  
        }
      );
    }
    else if(this.tombol == "edit"){
      this.distributorservice.editdistributor(new DistributorArray(this.id,this.nama,this.alamat,this.notelp,this.jenis))
      .subscribe(
        (data:DistributorArray[])=>{
          this.open('success','Data Distributor','Edit Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Distributor','Edit Data Gagal!');
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
      this.tombol = "edit";
      $('#responsive-modal').modal('show');
    },500);
  }

  hapus(item){
    /**/
    let konfirmasi = confirm("Anda yakin menghapus data?");
    if(konfirmasi == true){
      this.spinner.show();
      this.distributorservice.deletedistributor(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Data Distributor','Hapus Data Sukses!');
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
