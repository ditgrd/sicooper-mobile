import React from "react";
import { View, Text, Image } from "react-native";
import react from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";

export default function ListTransaksi(){
    const[listtransaksi, setListTransaksi] = React.useState(null);

    async function getListTransaksi(kode_transaksi) {
        var req = await fetch(env.base_url+'/api/mobile/listtransaksi/'+ kode_transaksi, {
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

    console.log(listtransaksi)

    return(
        <View style={[{
            // paddingHorizontal: 20
            marginTop: 5
        }]}>
            <FlatList data={listtransaksi}
            renderItem={({item, index}) => (
                <TouchableOpacity style={{
                    borderColor: 'gray',
                    borderBottomWidth: 1,
                    paddingVertical: 30,
                    backgroundColor: 'white'
                }} key={index}>
                    <Text>{item.kode}</Text>
                </TouchableOpacity>
            )}
            />
        </View>
    )
}