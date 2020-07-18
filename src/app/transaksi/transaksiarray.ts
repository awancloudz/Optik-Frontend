export class TransaksiArray {
    constructor ( 
        public id:Number, public kodetransaksi:String, public jenistransaksi:String, public tanggaltransaksi:String,
        public jamtransaksi:String, public tanggalselesai:String, public jamselesai:String, public id_customer:Number,
        public id_profile:Number, public id_karyawan:Number, public totaldiskon:Number, public totalbelanja:Number,
        public asuransi:Number, public subtotal:Number, public bayar:Number, public kembali:Number, public sisa:Number,
        public catatan:String, public status:String, public statustoko:String
    ){}
}