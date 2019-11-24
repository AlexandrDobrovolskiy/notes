import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';

import { TextStyles } from '#theme';

function ListItem({ title, subtitle, actions }) {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title}>{title}</Text>
                <Divider />
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
        </View>
    );
};

ListItem.propTypes = {
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node.isRequired,
    actions: PropTypes.arrayOf(PropTypes.node.isRequired),
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        zIndex: 100,
    },
    body: {
        flex: 1,
    },
    title: {
        ...TextStyles.cardTitle,
    },
    subtitle: {
        ...TextStyles.cardSubtitle,
    },
    actions: {

    },
});

export default ListItem;
