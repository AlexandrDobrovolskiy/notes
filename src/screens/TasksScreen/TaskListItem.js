import React from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback } from 'react-native';
import Animated from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Divider } from 'react-native-paper';

import ListItem from '#lib/components/ListItem';
import useTiming from '#lib/hooks/animations/useTiming';

const DEFAULT_HEIGHT = 60;
const LEAVE_DURATION = 70;

function TaskListItem({ task, onSelect, onDoneButtonPress, onRemoveTransitionStart, onRemoveTransitionFinish }) {
    const config = {
        fromValue: DEFAULT_HEIGHT,
        toValue: 0,
        duration: LEAVE_DURATION,
    };
    const { position, startTiming } = useTiming(
        config,
        handleRemoveTransitionStart,
        handleRemoveTransitionFinish
    );

    function renderRemoveAction() {
        return (
            <View style={styles.removeActionContainer}>
                <Text style={styles.removeActionText}>Remove</Text>
            </View>
        );
    }

    function renderDoneAction() {
        const additionalStyle = task.done ? styles.doneButtonRed : styles.doneButtonGreen;
        const title = task.done ? "Not Done" : "Done";
        return (
            <Button
                style={[styles.doneButton, additionalStyle]}
                onPress={handleDone}
                title={title}
            />
        );
    }

    function handleDone() {
        onDoneButtonPress(task.id);
    }

    function handleSelect() {
        onSelect(task.id);
    }

    function handleSwipeRight() {
        startTiming();
    }

    function handleRemoveTransitionStart() {
        onRemoveTransitionStart(task.id);
    }

    function handleRemoveTransitionFinish() {
        onRemoveTransitionFinish(task.id);
    }

    return (
        <Animated.View style={{ height: position }}>
            <Swipeable
                friction={1}
                overshootFriction={9}
                overshootRight={false}
                renderRightActions={renderRemoveAction}
                onSwipeableRightOpen={handleSwipeRight}
                containerStyle={{ flexDirection: "column" }}
                rightThreshold={100}
            >
                    <TouchableWithoutFeedback onPress={handleSelect}>
                        <View style={styles.cardContainer}>
                            <ListItem
                                title={task.name}
                                subtitle={task.project}
                                containerStyle={{ flex: 1 }}
                                renderActions={renderDoneAction}
                                cross={task.done}
                            />
                            <Divider style={styles.divider} />
                        </View>
                    </TouchableWithoutFeedback>
                </Swipeable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'rgb(20,20,20)',
    },
    removeActionText: {
        color: 'rgb(240,240,240)',
        fontWeight: 'bold',
    },
    removeActionContainer: {
        flex: 1,
        backgroundColor: '#f44336',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
    },
    doneButton: {

    },
    doneButtonRed: {

    },
    doneButtonGreen: {

    },
    divider: {
        backgroundColor: 'rgba(255, 255, 255, .1)',
    },
});

TaskListItem.propTypes = {

};

export default TaskListItem;
