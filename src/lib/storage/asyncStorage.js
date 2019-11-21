import AsyncStorage from '@react-native-community/async-storage';

const read = async (key) => {
    const data = await AsyncStorage.getItem(key);

    if (!data) {
        return null;
    }

    try {
        return JSON.parse(data);
    } catch (err) {
        console.warn(err);
        return null;
    };
};

const write = async (key, data) => {
    const string = JSON.stringify(data);

    await AsyncStorage.setItem(key, string);
};

module.exports = {
    read,
    write,
};
