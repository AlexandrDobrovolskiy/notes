import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Animated, { spring } from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import PropTypes from 'prop-types';

const {
    Clock,
    Value,
} = Animated;


function AddItemButton({ title, submitButtonTitle, onSubmit, style, ...buttonProps }) {
    const [opened, setOpened] = useState(false);
    const [name, setName] = useState('');

    function toggle() {
        setOpened(o => !o);
    }

    return (
        <View style={[styles.container, style]}>
            <TextInput
                onSubmitEditing={() => {
                    onSubmit(name)
                }}
                onChangeText={setName}
                style={{ width: '100%', height: '100%' }} placeholder="Add New Task" onFocus={toggle} onBlur={toggle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'pink',
        height: 80,
    },
});

AddItemButton.propTypes = {
    title: PropTypes.string.isRequired,
    submitButtonTitle: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default AddItemButton;
