import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import { Octicons, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import Pembiayaan from "./Pembiayaan";
import ListTransaksi from "./ListTransaksi";
import react from "react";
import { ImageBackground } from "react-native";
import moment from "moment";
import MoneyFormat from "../system/MoneyFormat";

export default function Simpanan({navigation, route}) {
    const [simpanan, setSimpanan] = React.useState(null);

    async function getSimpanan(kode_rek_simpanan) {
        var req = await fetch(env.base_url+'/api/mobile/simpanan/'+ kode_rek_simpanan, {
          method: 'GET'
        });
  
        var response = await req.json();
          if (response.status == 'success') {
               setSimpanan(response.data);
          } 
          return;
      }
  
      react.useMemo(async() => {
        await getSimpanan(route.params.kode_rek_simpanan);
      }, [])

      console.log(simpanan)

    const Pembiayaan = () => {
      navigation.navigate('Pembiayaan');
    };
    const ListTransaksi = () => {
      navigation.navigate('ListTransaksi');
    };

    return(
        <View>
            {/* Simpanan Card */}
            <View 
            style={{
                with: 180, 
                height: 350, 
                backgroundColor: '#DAFFFB', 
                borderRadius: 15
            }}>
                <View>
                    <View style={{marginLeft: 15, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        <ImageBackground source={require('../img/SICooperAtm.png')} style={{width: 200, height: 123, borderRadius: 10, overflow: 'hidden', marginTop: 15}}>
                            <Text style={{fontWeight: 'bold', marginLeft: 22, fontSize: 14, color: 'white', marginTop: 70}}>{simpanan == null ? '-' : simpanan.simpanan.kode_rek_simpanan}</Text>
                        </ImageBackground>                        
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 5, marginTop: 10}}>Tabungan</Text>
                            <Text>{simpanan == null ? '-' : simpanan.simpanan.jenis_simpanan}</Text>
                        </View>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold', marginRight: 5, marginTop: 25}}>Saldo</Text>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{simpanan == null ? '-' : MoneyFormat(simpanan.saldo)}</Text>
                        </View>
                        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontSize: 15, fontWeight: 'bold', marginRight: 5, marginTop: 25}}>Tanggal Mulai</Text>
                            <Text style={{fontSize: 14}}>{simpanan == null ? '-' : moment(simpanan.tgl_mulai_simpanan).format('LL')}</Text>
                        </View>
                    </View>
                </View>
            </View>
            
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    marginTop: 20,
                    height: 100,
                    width: 300,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 15,
                    elevation: 5
                }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 15, marginTop: 20}}>
                        {/* <TouchableOpacity>
                            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                                <Octicons name="repo-pull" size={35} color="black" />
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>Bayar</Text>
                                </View>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={Pembiayaan}>
                            <View style={{flexDirection: 'column', alignItems: 'center', marginLeft: 30}}>
                                <Entypo name="credit" size={35} color="black" />
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>Pembiayaan</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ListTransaksi}>
                            <View style={{flexDirection: 'column', alignItems: 'center', marginRight: 30}}>
                                <Octicons name="repo-pull" size={35} color="black" />
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text>Transaksi</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}