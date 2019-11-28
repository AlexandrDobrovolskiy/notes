import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Divider } from 'react-native-paper';

import ListItem from '#lib/components/ListItem';

const {
    Value,
    Clock,
    block,
    timing,
    call,
    cond,
    not,
    startClock,
    clockRunning,
    stopClock,
} = Animated;

const HEIGHT = 60;
const DURATION = 70;

const runTiming = (shouldRun, onClockStart, onClockStop) => {
    if (!shouldRun) {
        return new Value(HEIGHT);
    }

    const clock = new Clock();
    const state = {
        position: new Value(HEIGHT),
        finished: new Value(0),
        frameTime: new Value(0),
        time: new Value(0),
    };
    const config = {
        toValue: new Value(0),
        duration: DURATION,
        easing: Easing.linear,
    };

    return block([
        cond(not(clockRunning(clock)),
            [
                startClock(clock),
                call([] ,onClockStart)
            ]
        ),
        timing(clock, state, config),
        cond(state.finished,
            [
                stopClock(clock),
                call([], onClockStop),
            ],
        ),
        state.position
    ]);
};

function TaskListItem({ task, onSelect, onDoneButtonPress, onRemoveTransitionStart, onRemoveTransitionFinish }) {
    const [removing, setRemoving] = useState(false);

    function renderRemoveAction() {
        return (
            <View style={styles.removeActionContainer}>
                <Text style={styles.removeActionText}>Otsosi</Text>
            </View>
        );
    }

    function renderDoneAction() {
        function handleDone() {
            onDoneButtonPress(task.id);
        }

        return (
            <>
                <Button style={{ zIndex: 10 }} onPress={handleDone} title={task.done ? "Done" : "Not Done"}/>
            </>
        );
    }

    function handleSwipeRight() {
        setRemoving(true);
    }

    function handleRemoveTransitionStart() {
        onRemoveTransitionStart(task.id);
    }

    function handleRemoveTransitionFinish() {
        onRemoveTransitionFinish(task.id);
    }

    const height = runTiming(
        removing,
        handleRemoveTransitionStart,
        handleRemoveTransitionFinish
    );

    return (
        <Animated.View style={{ height }}>
            <Swipeable
                friction={1}
                overshootRight={false}
                renderRightActions={renderRemoveAction}
                onSwipeableRightOpen={handleSwipeRight}
                containerStyle={{ flexDirection: "column" }}
            >
                    <View style={styles.cardContainer}>
                        <ListItem
                            title={task.name}
                            subtitle={task.project}
                            containerStyle={{ flex: 1 }}
                            renderActions={renderDoneAction}
                        />
                        <Divider style={styles.divider} />
                    </View>
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
    divider: {
        backgroundColor: 'rgba(255, 255, 255, .1)',
    },
});

TaskListItem.propTypes = {

};

export default TaskListItem;
