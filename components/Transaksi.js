import React from "react";
import { View, Text } from "react-native";
import react from "react";

export default function Transaksi() {
    const [transaksi, setTransaksi] = React.useState(null);

    async function getTransaksi(pengirim_penerima_transaksi) {
        var req = await fetch(env.base_url+'/api/mobile/transaksi/'+ pengirim_penerima_transaksi, {
          method: 'GET'
        });
  
        var response = await req.json();
          if (response.status == 'success') {
               setTransaksi(response.data);
          } 
          return;
      }
  
      react.useMemo(async() => {
        var usr= await JSON.parse(await func.SesGet ('login'))
        await getTransaksi(usr.user_anggota);
      }, [])

    return(
        <View>
            {/* Header */}
            <View style={{flexDirection: 'row'}}>
                <View style={{
                        width: 195,
                        height: 80,
                        backgroundColor: '#DAFFFB'
                    }}>
                        <Text style={{
                        textAlign: 'left',
                        marginTop: 35,
                        marginLeft: 20,
                        fontWeight: 'bold',
                        fontSize: 20
                        }}>
                        Transaksi {transaksi == null ? '-' : transaksi.pengirim_penerima_transaksi}
                    </Text>
                </View>
                <View style={{
                    width: 195,
                    height: 80,
                    backgroundColor: '#DAFFFB'
                }}>
                </View>
            </View>

            <View>
                <Text>Hen</Text>
            </View>
        </View>
    )
}