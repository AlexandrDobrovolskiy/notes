import React from 'react';
import { StyleSheet, View } from 'react-native';

const Divider = ({ additionalStyles, vertical }) => {
    let orientationStyle = vertical ? styles.vertical : styles.horizontal;

    return <View style={[orientationStyle, additionalStyles]} />
};

const styles = StyleSheet.create({
    horizontal: {
        width: '100%',
        height: 2,
    },
    vertical: {

    },
});

export default Divider;
