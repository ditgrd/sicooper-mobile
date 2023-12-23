import React from "react";
import { View, Text } from "react-native";
import react from "react";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from "moment/moment";

export default function ListSimpanan(){
    const navigation = useNavigation();

    const[listsimpanan, setListSimpanan] = React.useState(null);

    async function getListSimpanan(kode_anggota) {
        var req = await fetch(env.base_url+'/api/mobile/listsimpanan/'+ kode_anggota, {
            method: 'GET'
        });

        var response = await req.json();
            if (response.status == 'success') {
                setListSimpanan(response.data);
            } 
            return;
        }

        react.useMemo(async() => {
        var usr= await JSON.parse(await func.SesGet ('login'))
        await getListSimpanan(usr.user_anggota);
    }, [])

    console.log(listsimpanan)

    return(
        <View style={[{
            // paddingHorizontal: 20
            marginTop: 5
        }]}>
            <FlatList data={listsimpanan}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => navigation.navigate('Simpanan', {kode_rek_simpanan: item.kode_rek_simpanan})}
                style={{
                    borderColor: 'gray',
                    borderBottomWidth: 1,
                    paddingVertical: 30,
                    backgroundColor: 'white'
                }} key={index}>
                    <Text>{item.kode_rek_simpanan}</Text>
                    <Text>{item.jenis_simpanan}</Text>
                    <Text>{item.kode_anggota}</Text>
                    <Text>{moment(item.tgl_mulai_simpanan).format('LL')}</Text>
                </TouchableOpacity>
            )}
            />
            
        </View>
    )
}