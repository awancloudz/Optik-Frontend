import { Component, OnInit } from '@angular/core';
//Service
import { StokPusatService } from '../stok-pusat.service';
import { KategoriProdukService } from '../kategori-produk.service';
import { MerkService } from '../merk.service';
//Array
import { StokPusatArray } from '../stok-pusat/stok-pusatarray';
import { KategoriProdukArray } from '../kategori-produk/kategori-produkarray';
import { MerkArray } from '../merk/merkarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AlertsService} from '@jaspero/ng-alerts';

import { DistributorComponent } from '../distributor/distributor.component';
import { HomeComponent, HomeNotfoundComponent } from '../home/home.component';
import { KategoriProdukComponent } from '../kategori-produk/kategori-produk.component';
import { KaryawanComponent } from '../karyawan/karyawan.component';
import { TransaksiComponent, TransaksiViewComponent, TransaksiAddComponent } from '../transaksi/transaksi.component';
import { CustomerComponent } from '../customer/customer.component';
import { MerkComponent } from '../merk/merk.component';
import { PenggunaComponent } from '../pengguna/pengguna.component';
import { CabangComponent, CabangUtamaComponent, CabangStokComponent, CabangTransaksiComponent } from '../cabang/cabang.component';

declare var $:any;

@Component({
  selector: 'app-stok-pusat',
  templateUrl: './stok-pusat.component.html',
  styleUrls: ['./stok-pusat.component.css']
})
export class StokPusatComponent implements OnInit {
  items:StokPusatArray[]=[];
  kategori:KategoriProdukArray[]=[];
  merk:MerkArray[]=[];

  id:any;
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
  txtcari:String;
  tombol:String;
  pilihkategori:any;
  pilihmerk:any;

  //ImageUpload
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;

  stokpusatForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };

  constructor(public route:ActivatedRoute, public router:Router,public kategoriprodukservice:KategoriProdukService,
    public stokpusatservice:StokPusatService, public merkservice:MerkService,private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder, private _alert: AlertsService,private http: HttpClient) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.spinner.show();
    this.stokpusatForm = this.formBuilder.group({
      kodeproduk: ['', Validators.required],
      id_kategoriproduk: ['', Validators.required],
      id_merk: ['', Validators.required],
      namaproduk: ['', Validators.required],
      seriproduk: ['', Validators.nullValidator],
      hargajual: ['', Validators.required],
      hargagrosir: ['', Validators.required],
      hargadistributor: ['', Validators.required],
      diskon: ['', Validators.nullValidator],
      stok: ['', Validators.required],
      foto: ['', Validators.nullValidator],
    });

    var idkategoriproduk = this.route.snapshot.paramMap.get('id');
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

    this.stokpusatservice.showstokpusat(idkategoriproduk).subscribe(
      //Jika data sudah berhasil di load
      (data:StokPusatArray[])=>{
        this.items=data;
        this.id_kategoriproduk = idkategoriproduk;
        this.pilihkategori = idkategoriproduk;
        // $(".selectid_kategoriproduk").select2();
        // $(".selectid_merk").select2();
        this.merkservice.showbycat(idkategoriproduk).subscribe(
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

    this.router.resetConfig(
      [
        { path: 'home', component: HomeComponent },
        { path: '',
          redirectTo: '/home',
          pathMatch: 'full'
        },
        { path: 'distributor', component: DistributorComponent },
        { path: 'customer', component: CustomerComponent },
        { path: 'kategoriproduk', component: KategoriProdukComponent },
        { path: 'merk', component: MerkComponent },
        { path: 'karyawan', component: KaryawanComponent },
        { path: 'produk/kategori/:id', component: StokPusatComponent },
        { path: 'pengguna', component: PenggunaComponent },
        { path: 'cabang', component: CabangComponent },
        { path: 'cabang/stok/:id', component: CabangStokComponent },
        { path: 'cabang/transaksi/:id', component: CabangTransaksiComponent },
        { path: 'profile', component: CabangUtamaComponent },
        { path: 'transaksi/:jenis', component: TransaksiComponent},
        { path: 'transaksi/view/:idtrans', component: TransaksiViewComponent},
        { path: 'transaksi/add/:jenis', component: TransaksiAddComponent},
        { path: 'notfound', component: HomeNotfoundComponent },
      ]
    );
  }

  get f() { return this.stokpusatForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.stokpusatForm.invalid) {
      return;
    }
    this.simpan();
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }
  preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result;
    }
  }

  cari(){
    //this.spinner.show();
    this.stokpusatservice.searchstokpusat(new StokPusatArray(this.id,this.txtcari,this.id_kategoriproduk,this.id_merk,
      this.namaproduk,this.seriproduk,this.hargajual,this.hargagrosir,this.hargadistributor,this.diskon,this.stok,this.foto)).subscribe(
      //Jika data sudah berhasil di load
      (data:StokPusatArray[])=>{
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
      this.stokpusatservice.showstokpusat(idcat).subscribe(
        //Jika data sudah berhasil di load
        (data:StokPusatArray[])=>{
          this.items=data;
          this.id_kategoriproduk = idcat;
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
      this.stokpusatservice.showall().subscribe(
        //Jika data sudah berhasil di load
        (data:StokPusatArray[])=>{
          this.items=data;
          this.merk = [];
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
  }

  carikategoriform(){
    var idcat = this.id_kategoriproduk;
    //Tampilkan Merk
    this.merkservice.showbycat(idcat).subscribe(
      //Jika data sudah berhasil di load
      (datamerk:MerkArray[])=>{
        this.merk=datamerk;
        if(datamerk.length > 0){
          this.id_merk = datamerk[0].id;
        }
      },
      //Jika Error
      function (error){   
      },
      //Tutup Loading
      function(){
      }
    );
  }

  carimerk(){
    this.spinner.show();
    var idmerk = this.pilihmerk;
    this.merkservice.showbymerk(idmerk).subscribe(
      //Jika data sudah berhasil di load
      (data:StokPusatArray[])=>{
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
    //this.id_kategoriproduk = '';
    this.id_merk = '';
    this.kodeproduk = '';
    this.namaproduk = '';
    this.seriproduk = '';
    this.hargajual = null;
    this.hargagrosir = null;
    this.hargadistributor = null;
    this.diskon = 0;
    this.stok = null;
    this.foto = '';
  }

  tambah(){
    $('#responsive-modal').modal('show');
    this.tombol = "tambah";
    this.kosongfield();
  }

  edit(item){
    setTimeout(() => {
      this.id = item.id;
      this.kodeproduk = item.kodeproduk;
      this.id_kategoriproduk = item.id_kategoriproduk;
      this.id_merk = item.id_merk;
      this.namaproduk = item.namaproduk;
      this.seriproduk = item.seriproduk;
      this.hargajual = item.hargajual;
      this.hargagrosir = item.hargagrosir;
      this.hargadistributor = item.hargadistributor;
      this.diskon = item.diskon;
      this.stok = item.stok;
      this.foto = item.foto;
      this.tombol = "edit";
      $('#responsive-modal').modal('show');
    },500);

    /*getBase64ImageFromUrl()
    .then(result => console.log(result))
    .catch(err => console.error(err));

    async function getBase64ImageFromUrl() {
      var imageUrl = "http://localhost:8000/fotoupload/" + item.foto;
      var res = await fetch(imageUrl, {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        mode: "no-cors"
      });
      var blob = await res.blob();
      
      return new Promise((resolve, reject) => {
        var reader  = new FileReader();
        reader.addEventListener("load", function () {
            resolve(reader.result);
        }, false);
    
        reader.onerror = () => {
          return reject(this);
        };
        reader.readAsDataURL(blob);
      })
    }*/
  }

  simpan(){
    this.spinner.show();
    const formData = new FormData();  
    formData.append('id', this.id);
    formData.append('kodeproduk', this.kodeproduk);
    formData.append('id_kategoriproduk', this.id_kategoriproduk);
    formData.append('id_merk', this.id_merk);
    formData.append('namaproduk', this.namaproduk);
    formData.append('seriproduk', this.seriproduk);
    formData.append('hargadistributor', this.hargadistributor);
    formData.append('hargagrosir', this.hargagrosir);
    formData.append('hargajual', this.hargajual);
    formData.append('diskon', this.diskon);
    formData.append('stok', this.stok);
    formData.append('foto', this.fileData);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    this.fileUploadProgress = '0%';
    
    if(this.tombol == "tambah"){
      this.http.post('http://localhost:8000/stok-pusat', formData, {
        headers: headers,
        reportProgress: true,
        observe: 'events',
        'responseType': 'text'   
      })
      .subscribe(events => {
        if(events.type === HttpEventType.UploadProgress) {
          this.fileUploadProgress = Math.round(events.loaded / events.total * 100) + '%';
        } else if(events.type === HttpEventType.Response) {
          this.fileUploadProgress = '';
          this.open('success','Data Produk','Simpan Data Sukses!');
          this.spinner.hide();
          this.ngOnInit();
          this.submitted = false;
        }  
      }) 
    }
    else if(this.tombol == "edit"){
      this.stokpusatservice.editstokpusat(new StokPusatArray(this.id,this.kodeproduk,this.id_kategoriproduk,this.id_merk,this.namaproduk,this.seriproduk,this.hargadistributor,this.hargagrosir,this.hargajual,this.diskon,this.stok,this.foto))
      .subscribe(
        (data:StokPusatArray[])=>{
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
    }
    this.kosongfield();
    $('#responsive-modal').modal('hide');
  }

  hapus(item){
    /**/
    let konfirmasi = confirm("Anda yakin menghapus data?");
    if(konfirmasi == true){
      this.spinner.show();
      this.stokpusatservice.deletestokpusat(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Data Stok Produk Pusat','Hapus Data Sukses!');
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
