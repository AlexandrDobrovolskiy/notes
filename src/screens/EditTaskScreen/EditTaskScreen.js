import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function EditTaskScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Hell o {navigation.getParam('taskId')} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

EditTaskScreen.propTypes = {

};

export default EditTaskScreen;
