import { Component, OnInit } from '@angular/core';
//Service
import { CustomerService } from '../customer.service';
//Array
import { CustomerArray } from '../customer/customerarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertsService} from '@jaspero/ng-alerts';

declare var $:any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  items:CustomerArray[]=[];
  id:any;
  nama:String;
  alamat:String;
  notelp:String;
  jenis:String;
  txtcari:String;
  tombol:String;

  customerForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router,public customerservice:CustomerService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { 

  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.customerForm = this.formBuilder.group({
      nama: ['', Validators.required],
      alamat: ['', Validators.required],
      notelp: ['', [Validators.required]]
    });
    this.spinner.show();
    this.customerservice.showcustomer().subscribe(
      //Jika data sudah berhasil di load
      (data:CustomerArray[])=>{
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

  get f() { return this.customerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.customerForm.invalid) {
      return;
    }
    this.simpan();
  }

  cari(){
    //this.spinner.show();
    this.customerservice.searchcustomer(new CustomerArray(this.id,this.txtcari,this.alamat,this.notelp,this.jenis)).subscribe(
      //Jika data sudah berhasil di load
      (data:CustomerArray[])=>{
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
    this.jenis = "customer";

    if(this.tombol == "tambah"){
      this.customerservice.savecustomer(new CustomerArray(this.id,this.nama,this.alamat,this.notelp,this.jenis))
      .subscribe(
        (data:CustomerArray[])=>{
          this.open('success','Data Customer','Simpan Data Sukses!');
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
      this.customerservice.editcustomer(new CustomerArray(this.id,this.nama,this.alamat,this.notelp,this.jenis))
      .subscribe(
        (data:CustomerArray[])=>{
          this.open('success','Data Customer','Edit Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
        },
        function(error){
          this.open('error','Data Customer','Edit Data Gagal!');
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
      this.customerservice.deletecustomer(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Data Customer','Hapus Data Sukses!');
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
