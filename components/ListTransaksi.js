import React from "react";
import { View, Text, Image } from "react-native";
import react from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from "moment/moment";

export default function ListTransaksi(){
    const navigation = useNavigation();

    const[listtransaksi, setListTransaksi] = React.useState(null);

    async function getListTransaksi(pengirim_penerima_transaksi) {
        var req = await fetch(env.base_url+'/api/mobile/listtransaksi/'+ pengirim_penerima_transaksi, {
            method: 'GET'
        });

        var response = await req.json();
            if (response.status == 'success') {
                setListTransaksi(response.data);
            } 
            return;
        }

        react.useMemo(async() => {
        var usr= await JSON.parse(await func.SesGet ('login'))
        await getListTransaksi(usr.user_anggota);
    }, [])

    return(
        <View style={[{
            // paddingHorizontal: 20
            marginTop: 5
        }]}>
            <FlatList data={listtransaksi}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => navigation.navigate('Transaksi', {kode_transaksi: item.kode_transaksi})}
                style={{
                    borderColor: 'gray',
                    borderBottomWidth: 1,
                    paddingVertical: 30,
                    backgroundColor: 'white'
                }} key={index}>
                    <Text>{item.kode_transaksi}</Text>
                    <Text>{item.jenis_transaksi}</Text>
                    <Text>{item.nominal_transaksi}</Text>
                    <Text>{moment(item.tanggal_transaksi).format('LL')}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
    )
}