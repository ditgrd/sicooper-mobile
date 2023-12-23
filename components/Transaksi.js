import React from "react";
import { View, Text, Image } from "react-native";
import react from "react";
import moment from "moment";

export default function Transaksi({navigation, route}) {
    const [transaksi, setTransaksi] = React.useState(null);

    async function getTransaksi(kode_transaksi) {
        var req = await fetch(env.base_url+'/api/mobile/transaksi/'+ kode_transaksi, {
          method: 'GET'
        });
  
        var response = await req.json();
          if (response.status == 'success') {
               setTransaksi(response.data);
          } 
          return;
      }
  
      react.useMemo(async() => {
        await getTransaksi(route.params.kode_transaksi);
      }, [])

    return(
        <View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{width: 500, height: 340, backgroundColor: '#DAFFFB', alignItems: 'center'}}>
                    <Image source={transaksi == null ? require('../img/logo.png') : {uri: env.base_url+"/foto_transaksi/" + transaksi.foto_transaksi}} 
                    style={{
                        marginTop: 30,
                        width: 120,
                        height: 121,
                        borderRadius: 15
                    }}
                    />
                    <View>
                        <Text style={{marginTop: 15, fontSize: 20, fontWeight: 'bold'}}>Rp. {transaksi == null ? '-' : transaksi.nominal_transaksi}</Text>
                    </View>
                    <View>
                        <Text style={{marginTop: 10, fontSize: 18}}>AGT{transaksi == null ? '-' : transaksi.keterangan_transaksi}</Text>
                    </View>
                </View>

                <View style={{width: 500, height: 500, backgroundColor: 'white', marginTop: 5, elevation: 5}}>
                    <Text style={{marginLeft: 70, marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>Detail Transaksi</Text>
                    <View style={{marginLeft: 90, marginRight: 90}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Kode Transaksi</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : transaksi.kode_transaksi}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Status</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : transaksi.jenis_transaksi}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Tujuan</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : transaksi.pengirim_penerima_transaksi}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Bank</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : transaksi.bank_transaksi}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Rekening</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : transaksi.kode_rek}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Jenis</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : transaksi.kode_jurnal}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Keterangan</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : transaksi.keterangan_transaksi}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Tanggal</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : moment(transaksi.tgl_input_transaksi).format('LL')}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 7}}>
                            <Text style={{fontSize: 17}}>Nominal</Text>
                            <Text style={{fontSize: 17}}>{transaksi == null ? '-' : transaksi.nominal_transaksi}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}