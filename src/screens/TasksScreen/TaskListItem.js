import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card } from 'react-native-paper';
import Animated, { Easing } from 'react-native-reanimated';
import { useMemoOne } from 'use-memo-one';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import ListItem from '#lib/components/ListItem';

const {
    Value,
    Clock,
    block,
    timing,
    call,
    cond,
    interpolate,
    Extrapolate,
    startClock,
    stopClock,
} = Animated;

const HEIGHT = 60;
const DURATION = 100;

const runTiming = (clock, shouldRun, onFinish) => {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        frameTime: new Value(0),
        time: new Value(0),
    };
    
    const config = {
        toValue: new Value(1),
        duration: DURATION,
        easing: Easing.linear,
    };

    const shouldRunValue = new Value(shouldRun ? 1 : 0);

    return block([
        cond(shouldRunValue, [
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished,
            [
                stopClock(clock),
                call([], onFinish),
            ],
        ),
        state.position
    ]);
};

function TaskListItem({ task, onSelect, onRemove }) {
    const [removing, setRemoving] = useState(false);

    function renderRemoveAction(progress, dragX) {
        return (
            <View style={styles.removeActionContainer}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Otsosi</Text>
            </View>
        );
    }

    function handleSwipeRight() {
        setRemoving(true);
    }

    const { clock } = useMemoOne(() => ({
        clock: new Clock(),
    }), []);

    const progress = runTiming(clock, removing, () => {
        setRemoving(false);
        onRemove(task.createdAt);
    });

    const height = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [HEIGHT, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    return (
        <Animated.View style={{ height }}>
            <Swipeable
                friction={2}
                leftThreshold={80}
                rightThreshold={40}
                renderRightActions={renderRemoveAction}
                onSwipeableRightOpen={handleSwipeRight}
            >
                <Card style={styles.container}>
                    <ListItem title={task.name} subtitle={task.project} />
                </Card>
            </Swipeable>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    removeBackground: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    removeActionContainer: {
        width: '100%',
        backgroundColor: '#f44336',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
    },
});

TaskListItem.propTypes = {

};

export default TaskListItem;
