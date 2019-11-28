import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from 'react-native-paper';

import { TextStyles } from '#theme';

function ListItem({ title, subtitle, containerStyle, renderActions }) {

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={styles.body}>
                <Text style={styles.title}>{title}</Text>
                <Divider style={{ backgroundColor: 'rgba(255, 255, 255, .07)' }}/>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            <View style={styles.actions}>
                {renderActions && renderActions()}
            </View>
        </View>
    );
};

ListItem.propTypes = {
    title: PropTypes.node.isRequired,
    subtitle: PropTypes.node.isRequired,
    actions: PropTypes.arrayOf(PropTypes.node.isRequired),
    renderActions: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        zIndex: 100,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    body: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        paddingBottom: 4,
        paddingLeft: 4,
        ...TextStyles.cardTitle,
    },
    subtitle: {
        paddingLeft: 4,
        ...TextStyles.cardSubtitle,
    },
    actions: {
        paddingLeft: 8,

    },
});

export default ListItem;
