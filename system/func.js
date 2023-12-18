import * as SecureStore from 'expo-secure-store';

export default func = {
    SesStore: async (key, val) => {
        return await SecureStore.setItemAsync(key, val);
    },
    SesGet: async (key) => {
        return await SecureStore.getItemAsync(key);
    },
    SesDel: async (key) => {
        return await SecureStore.deleteItemAsync(key);
    }
}