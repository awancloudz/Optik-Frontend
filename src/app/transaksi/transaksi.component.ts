import { Component, OnInit } from '@angular/core';
import { formatDate,DatePipe } from '@angular/common';
//Service
import { TransaksiService } from '../transaksi.service';
import { KaryawanService } from '../karyawan.service';
import { CustomerService } from '../customer.service';
import { DistributorService } from '../distributor.service';
import { CabangService } from '../cabang.service';
import { StokPusatService } from '../stok-pusat.service';

//Array
import { TransaksiArray } from '../transaksi/transaksiarray';
import { KeranjangArray } from '../transaksi/keranjangarray';
import { PenggunaArray } from '../pengguna/penggunaarray';
import { KaryawanArray } from '../karyawan/karyawanarray';
import { CustomerArray } from '../customer/customerarray';
import { CabangArray } from '../cabang/cabangarray';
import { StokPusatArray } from '../stok-pusat/stok-pusatarray';

import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertsService } from '@jaspero/ng-alerts';

import { DistributorComponent } from '../distributor/distributor.component';
import { HomeComponent, HomeNotfoundComponent } from '../home/home.component';
import { KategoriProdukComponent } from '../kategori-produk/kategori-produk.component';
import { KaryawanComponent } from '../karyawan/karyawan.component';
import { StokPusatComponent } from '../stok-pusat/stok-pusat.component';
import { CustomerComponent } from '../customer/customer.component';
import { MerkComponent } from '../merk/merk.component';
import { PenggunaComponent } from '../pengguna/pengguna.component';
import { CabangComponent, CabangUtamaComponent, CabangStokComponent, CabangTransaksiComponent } from '../cabang/cabang.component';

declare var $:any;

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.css'],
})
export class TransaksiComponent implements OnInit {
  items:TransaksiArray[]=[];
  pengguna:PenggunaArray[]=[];
  level:String;
  jenis:any;
  id:Number; 
  kodetransaksi:String; 
  jenistransaksi:String; 
  tanggaltransaksi:String;
  jamtransaksi:String; 
  tanggalselesai:String; 
  jamselesai:String; 
  id_customer:Number;
  id_profile:Number; 
  id_karyawan:Number; 
  totaldiskon:Number; 
  totalbelanja:Number;
  asuransi:Number; 
  subtotal:Number; 
  bayar:Number; 
  kembali:Number; 
  sisa:Number;
  catatan:String; 
  status:String; 
  statustoko:String;
  txtcari:String;
  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router,public transaksiservice:TransaksiService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService) { 
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.spinner.show();
    this.jenis = this.route.snapshot.paramMap.get('jenis');
    this.pengguna = JSON.parse(localStorage.getItem("profileuser"));
    if(this.pengguna.length > 0){
      this.level = this.pengguna[0].level;
      this.id_profile = this.pengguna[0].id_profile;
    }
    if(this.level == 'admin'){
      this.tampiltransaksi();
    }
    else if((this.level == 'sales') && ((this.jenis == 'pesan') || (this.jenis == 'grosir') || (this.jenis == 'retail'))){
      this.tampiltransaksi();
    }
    else{
      this.router.navigateByUrl('notfound');
    }
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

  tampiltransaksi(){
    this.transaksiservice.showtransaksi(this.jenis).subscribe(
      //Jika data sudah berhasil di load
      (data:TransaksiArray[])=>{
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

  cari(){
    //this.spinner.show();
    this.transaksiservice.searchtransaksi(new TransaksiArray(this.id,this.txtcari,this.jenis,this.tanggaltransaksi,this.jamtransaksi,this.tanggalselesai,this.jamselesai,this.id_customer,this.id_profile,this.id_karyawan,this.totaldiskon,this.totalbelanja,this.asuransi,this.subtotal,this.bayar,this.kembali,this.sisa,this.catatan,this.status,this.statustoko)).subscribe(
      //Jika data sudah berhasil di load
      (data:TransaksiArray[])=>{
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

  hapus(item){
    let konfirmasi = confirm("Anda yakin menghapus data?");
    if(konfirmasi == true){
      this.spinner.show();
      this.transaksiservice.deletetransaksi(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Transaksi','Hapus Transaksi Sukses!');
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

  lunas(item){
    let konfirmasi = confirm("Konfirmasi pelunasan, klik OK untuk melanjutkan.");
    if(konfirmasi == true){
      this.spinner.show();
      this.transaksiservice.lunastransaksi(new TransaksiArray(item.id,item.kodetransaksi,item.jenis,item.tanggaltransaksi,item.jamtransaksi,item.tanggalselesai,item.jamselesai,item.id_customer,item.id_profile,item.id_karyawan,item.totaldiskon,item.totalbelanja,item.asuransi,item.subtotal,item.bayar,item.kembali,item.sisa,item.catatan,item.status,item.statustoko)).subscribe(
        //Jika data sudah berhasil di load
        (data:TransaksiArray[])=>{
          this.open('success','Transaksi','Pelunasan Transaksi Sukses!');
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
  selector: 'app-transaksi',
  templateUrl: './transaksi-view.component.html',
  styleUrls: ['./transaksi.component.css'],
})
export class TransaksiViewComponent implements OnInit {
  items:TransaksiArray[]=[];
  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };
  constructor(public route:ActivatedRoute, public router:Router,public transaksiservice:TransaksiService,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService){

  }

  ngOnInit(){
    window.scrollTo(0, 0);
    this.spinner.show();
    var idtrans = this.route.snapshot.paramMap.get('idtrans');
    this.transaksiservice.showdetailtransaksi(idtrans).subscribe(
      //Jika data sudah berhasil di load
      (data:TransaksiArray[])=>{
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

  lunas(item){
    let konfirmasi = confirm("Konfirmasi pelunasan, klik OK untuk melanjutkan.");
    if(konfirmasi == true){
      this.spinner.show();
      this.transaksiservice.lunastransaksi(new TransaksiArray(item.id,item.kodetransaksi,item.jenis,item.tanggaltransaksi,item.jamtransaksi,item.tanggalselesai,item.jamselesai,item.id_customer,item.id_profile,item.id_karyawan,item.totaldiskon,item.totalbelanja,item.asuransi,item.subtotal,item.bayar,item.kembali,item.sisa,item.catatan,item.status,item.statustoko)).subscribe(
        //Jika data sudah berhasil di load
        (data:TransaksiArray[])=>{
          this.open('success','Transaksi','Pelunasan Transaksi Sukses!');
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
  selector: 'app-transaksi',
  templateUrl: './transaksi-add.component.html',
  styleUrls: ['./transaksi.component.css'],
})
export class TransaksiAddComponent implements OnInit {
  transaksi:TransaksiArray[]=[];
  keranjang:KeranjangArray[]=[];
  pengguna:PenggunaArray[]=[];
  karyawan:KaryawanArray[]=[];
  customer:CustomerArray[]=[];
  cabang:CabangArray[]=[];
  produk:StokPusatArray[]=[];

  //Variabel master
  id_cabang:any;
  jenis:any;

  //Variabel keranjang
  id_produk:any;
  harga:any;
  jumlah:Number;
  total:Number;

  //Variabel Produk
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

  //Variabel Transaksi
  id:Number; 
  hari;
  kodetransaksi:String; 
  jenistransaksi:String; 
  tanggaltransaksi;
  jamtransaksi:String; 
  tanggalselesai; 
  jamselesai:String; 
  id_customer:Number;
  id_profile:Number; 
  id_karyawan:Number; 
  totaldiskon:Number; 
  totalbelanja:Number;
  asuransi:Number; 
  subtotal:Number; 
  bayar:Number; 
  kembali:Number; 
  sisa:Number;
  catatan:String; 
  status:String; 
  statustoko:String;

  loginstatus = localStorage.getItem('loginstatus');
  level:String;
  transaksiForm: FormGroup;
  submitted = false;

  AlertSettings = {
    overlay: true,
    overlayClickToClose: true,
    showCloseButton: false,
    duration: 2000
  };

  constructor(private datePipe: DatePipe,public route:ActivatedRoute, public router:Router,public transaksiservice:TransaksiService, public stokpusatservice:StokPusatService, 
    public karyawanservice:KaryawanService, public customerservice:CustomerService, public distributorservice:DistributorService,
    public cabangservice:CabangService, private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private _alert: AlertsService,
    ){

  }
  ngOnInit(){
    window.scrollTo(0, 0);
    this.spinner.show();
    this.jenis = this.route.snapshot.paramMap.get('jenis');
    this.pengguna = JSON.parse(localStorage.getItem("profileuser"));
    this.statustoko = JSON.parse(localStorage.getItem("profileuser"))[0].profile.statustoko;
    this.id_profile = JSON.parse(localStorage.getItem("profileuser"))[0].profile.id;
    this.status = "lunas";
    //Verifikasi Level
    if(this.pengguna.length > 0){
      this.level = this.pengguna[0].level;
    }
    if(this.level == 'admin'){
    }
    else if((this.level == 'sales') && ((this.jenis == 'pesan') || (this.jenis == 'grosir') || (this.jenis == 'retail'))){
    }
    else{
      this.router.navigateByUrl('notfound');
    }
    
    //Validator Awal
    this.transaksiForm = this.formBuilder.group({
      id_karyawan: ['0', Validators.required],
      id_customer: ['1', Validators.required],
      id_cabang: ['', Validators.nullValidator],
      status: ['', Validators.nullValidator],
      //tanggaltransaksi : new FormControl((new Date()).toISOString().substring(0,10)),
    });

    //Tampil Dropdown by Transaksi
    this.tampilsales();
    this.id_karyawan = 0;
    if(this.jenis == 'pembelian'){
      this.tampildistributor();
    }
    else if((this.jenis == 'pesan') || (this.jenis == 'grosir')){
      this.tampilcustomer();
      this.status = "belum";
    }
    else if(this.jenis == 'kirimcabang'){
      this.tampilcabang();
      this.id_customer = 1;
    }
    else if(this.jenis == 'retail'){
      this.id_customer = 1;
    }

    //this.tanggaltransaksi = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    //this.tanggaltransaksi = new Date().toISOString().substring(0,10);
    this.tanggaltransaksi = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.hari = 1;
    let selesai = new Date();
    let plus = Number(this.hari);
    selesai.setDate(selesai.getDate()+plus);
    this.tanggalselesai = this.datePipe.transform(selesai, 'yyyy-MM-dd');

    this.spinner.hide();
  }

  caribarcode(){
    if(this.kodeproduk != ''){
      this.spinner.show();
      if(this.statustoko == "pusat"){
        if(this.jenis == "kirimcabang"){
          this.id_customer = this.id_cabang;
        }
        this.stokpusatservice.searchbarcode(new StokPusatArray(this.id,this.kodeproduk,this.id_kategoriproduk,this.id_merk,
          this.namaproduk,this.seriproduk,this.hargajual,this.hargagrosir,this.hargadistributor,this.diskon,this.stok,this.foto)).subscribe(
          //Jika data sudah berhasil di load
          (data:StokPusatArray[])=>{
            if(data.length > 0){
              //JIKA STOK ADA
              if(data[0].stok > 0){
                this.produk=data;
                this.simpankeranjang();
                this.spinner.hide();
                this.kodeproduk = '';
              }
              //JIKA STOK KOSONG
              else{
                //this.open('Error','Keranjang Belanja','Maaf,Stok Produk Kosong!');
                alert("Maaf,Stok Produk Kosong!");
                this.spinner.hide();
                this.produk = [];
                this.kodeproduk = '';
              }
            }
            //PRODUK TIDAK DITEMUKAN
            else{
              //this.open('Error','Keranjang Belanja','Produk tidak ditemukan!');
              alert("Produk tidak ditemukan!");
              this.spinner.hide();
              this.produk = [];
              this.kodeproduk = '';
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
      else if(this.statustoko == "cabang"){
        this.stokpusatservice.searchbarcodecabang(new StokPusatArray(this.id_profile,this.kodeproduk,this.id_kategoriproduk,this.id_merk,
          this.namaproduk,this.seriproduk,this.hargajual,this.hargagrosir,this.hargadistributor,this.diskon,this.stok,this.foto)).subscribe(
          //Jika data sudah berhasil di load
          (data:StokPusatArray[])=>{
            if(data.length > 0){
              //JIKA STOK ADA
              if(data[0].stok > 0){
                this.produk=data;
                this.simpankeranjang();
                this.spinner.hide();
                this.kodeproduk = '';
              }
              //JIKA STOK KOSONG
              else{
                //this.open('Error','Keranjang Belanja','Maaf,Stok Produk Kosong!');
                alert("Maaf,Stok Produk Kosong!");
                this.spinner.hide();
                this.produk = [];
                this.kodeproduk = '';
              }
            }
            //PRODUK TIDAK DITEMUKAN
            else{
              //this.open('Error','Keranjang Belanja','Produk tidak ditemukan!');
              alert("Produk tidak ditemukan!");
              this.spinner.hide();
              this.produk = [];
              this.kodeproduk = '';
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
    }
  }

  simpankeranjang(){
    if(this.produk.length > 0){
      //SET HARGA
      if(this.jenis == 'pembelian'){
        this.harga = this.produk[0].hargadistributor;
        this.diskon = 0;
      }
      else if((this.jenis == 'retail') || (this.jenis == 'pesan') || (this.jenis == 'kirimcabang')){
        this.harga = this.produk[0].hargajual;
        this.diskon = (Number(this.produk[0].diskon) / 100) * Number(this.harga);
      }
      else if(this.jenis == 'grosir'){
        this.harga = this.produk[0].hargagrosir;
        this.diskon = 0;
      }
      //HITUNG TOTAL
      this.total = this.harga - this.diskon;
      this.transaksiservice.savekeranjang(new KeranjangArray(this.id,this.id_karyawan,this.produk[0].id,this.harga,1,this.diskon,this.total,this.jenis)).subscribe(
        //Jika data sudah berhasil di load
        (data2:KeranjangArray[])=>{
          this.produk = [];
          this.tampilkeranjang(); 
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

  updatekeranjang(newcart){
    this.transaksiservice.editkeranjang(new KeranjangArray(newcart.id,newcart.id_karyawan,newcart.id_produk,newcart.harga,newcart.jumlah,newcart.diskon,newcart.total,newcart.jenistransaksi)).subscribe(
      //Jika data sudah berhasil di load
      (data2:KeranjangArray[])=>{
        this.produk = [];
        this.tampilkeranjang(); 
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

  increment(i){
    this.keranjang[i].jumlah = Number(this.keranjang[i].jumlah) + 1;
    var harga = Number(this.keranjang[i].jumlah) * Number(this.keranjang[i].harga);
    var diskon = Number(this.keranjang[i].jumlah) * Number(this.keranjang[i].diskon);
    this.keranjang[i].total = harga - diskon;
    this.updatekeranjang(this.keranjang[i]);
  } 

  decrement(i){
    if(this.keranjang[i].jumlah > 1){
      this.keranjang[i].jumlah = Number(this.keranjang[i].jumlah) - 1;
      var harga = Number(this.keranjang[i].jumlah) * Number(this.keranjang[i].harga);
      var diskon = Number(this.keranjang[i].jumlah) * Number(this.keranjang[i].diskon);
      this.keranjang[i].total = harga - diskon;
      this.updatekeranjang(this.keranjang[i]);
    }
  }

  editdiskon(i){
    var diskonbaru = $(document.getElementById("diskon_"+i)).val();
    if(diskonbaru == ''){
      diskonbaru = 0;
    }
    var harga = Number(this.keranjang[i].jumlah) * Number(this.keranjang[i].harga);
    var diskon = Number(this.keranjang[i].jumlah) * Number(diskonbaru);
    this.keranjang[i].diskon = Number(diskonbaru);
    this.keranjang[i].total = harga - diskon;
    this.updatekeranjang(this.keranjang[i]);
  }

  editbayar(){
    if(this.bayar == null){
      this.bayar = 0;
    }
    else if(this.bayar == 0){
      this.sisa = this.subtotal;
      this.kembali = 0;
    }

    //BELUM LUNAS
    if(this.bayar <= this.subtotal){
      this.sisa = Number(this.subtotal) - Number(this.bayar);
      this.kembali = 0;
    }
    //LUNAS
    else if(this.bayar >= this.subtotal){
      this.sisa = 0;
      this.kembali = Number(this.bayar) - Number(this.subtotal);
    }

    if(this.sisa > 0){
      this.status = "belum";
    }
    else{
      this.status = "lunas";
    }
  }

  edithari(){
    if(this.hari != ''){
      let selesai = new Date();
      let plus = Number(this.hari);
      selesai.setDate(selesai.getDate()+plus);
      this.tanggalselesai = this.datePipe.transform(selesai, 'yyyy-MM-dd');
    }
  }

  tampilsales(){
    this.karyawanservice.showkaryawan().subscribe(
      //Jika data sudah berhasil di load
      (data:KaryawanArray[])=>{
        this.karyawan=data;
        if(data.length > 0){
          //Tampil keranjang
          this.tampilkeranjang();
        }
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

  tampilcustomer(){
    this.customerservice.showcustomer().subscribe(
      //Jika data sudah berhasil di load
      (data:CustomerArray[])=>{
        this.customer=data;
        if(data.length > 0){
          this.id_customer = data[0].id;
        }
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

  tampildistributor(){
    this.distributorservice.showdistributor().subscribe(
      //Jika data sudah berhasil di load
      (data:CustomerArray[])=>{
        this.customer=data;
        if(data.length > 0){
          this.id_customer = data[0].id;
        }
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

  tampilcabang(){
    this.cabangservice.showcabang().subscribe(
      //Jika data sudah berhasil di load
      (data:CabangArray[])=>{
        this.cabang=data;
        if(data.length > 0){
          this.id_cabang = data[0].id;
        }
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

  tampilkeranjang(){
    this.transaksiservice.showkeranjang(this.id_karyawan,this.jenis).subscribe(
      //Jika data sudah berhasil di load
      (data2:KeranjangArray[])=>{
        this.keranjang=data2;
        this.totaldiskon = 0;
        this.totalbelanja = 0;
        this.subtotal = 0;
        this.kembali = 0;
        this.sisa = 0;
        if(data2.length > 0){
          for(var key in data2){
            var hitungdiskon = Number(data2[key].jumlah) * Number(data2[key].diskon);
            var hitungharga = Number(data2[key].jumlah) * Number(data2[key].harga);
            this.totaldiskon = Number(this.totaldiskon) + hitungdiskon;
            this.totalbelanja = Number(this.totalbelanja) + hitungharga;
          }
          this.subtotal = Number(this.totalbelanja) - Number(this.totaldiskon);
          if(this.jenis != "kirimcabang"){
            this.sisa = this.subtotal;
          }
        }
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

  hapus(item){
    let konfirmasi = confirm("Anda yakin menghapus data?");
    if(konfirmasi == true){
      this.spinner.show();
      this.transaksiservice.deletekeranjang(item).subscribe(
        //Jika data sudah berhasil di load
        (data:any)=>{
          this.open('success','Keranjang Belanja','Hapus Item Sukses!');
          this.spinner.hide();
          this.tampilkeranjang();
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

  get f() { return this.transaksiForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.transaksiForm.invalid) {
      return;
    }
    this.simpan();
  }

  simpan(){
    this.spinner.show();
    this.transaksiservice.savetransaksi(new TransaksiArray(this.id,this.kodetransaksi,this.jenis,this.tanggaltransaksi,this.jamtransaksi,this.tanggalselesai,this.jamselesai,this.id_customer,this.id_profile,this.id_karyawan,this.totaldiskon,this.totalbelanja,this.asuransi,this.subtotal,this.bayar,this.kembali,this.sisa,this.catatan,this.status,this.statustoko))
      .subscribe(
        (data:TransaksiArray[])=>{
          this.open('success','Data Transaksi','Simpan Data Sukses!');
          this.spinner.hide();
          //this.ngOnInit();
          this.router.navigateByUrl('transaksi/'+this.jenis);
        },
        function(error){
          this.open('error','Data Transaksi','Simpan Data Gagal!');
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





