import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DistributorComponent } from './distributor/distributor.component';
import { HomeComponent, HomeNotfoundComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import { HttpModule } from '@angular/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { JasperoAlertsModule } from '@jaspero/ng-alerts';

import { KategoriProdukComponent } from './kategori-produk/kategori-produk.component';
import { KaryawanComponent } from './karyawan/karyawan.component';
import { StokPusatComponent } from './stok-pusat/stok-pusat.component';
import { CustomerComponent } from './customer/customer.component';
import { MerkComponent } from './merk/merk.component';
import { PenggunaComponent } from './pengguna/pengguna.component';
import { CabangComponent, CabangUtamaComponent, CabangStokComponent, CabangTransaksiComponent } from './cabang/cabang.component';
import { TransaksiComponent, TransaksiViewComponent, TransaksiAddComponent } from './transaksi/transaksi.component';

@NgModule({
  declarations: [
    AppComponent,
    DistributorComponent,
    HomeComponent, HomeNotfoundComponent,
    KategoriProdukComponent,
    KaryawanComponent,
    StokPusatComponent,
    CustomerComponent,
    MerkComponent,
    PenggunaComponent,
    CabangComponent, CabangUtamaComponent, CabangStokComponent, CabangTransaksiComponent, 
    TransaksiComponent, TransaksiViewComponent, TransaksiAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    JasperoAlertsModule.forRoot(),
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
