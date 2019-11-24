import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
    and,
    not,
    interpolate,
    Extrapolate,
    startClock,
    clockRunning,
    stopClock,
} = Animated;

const HEIGHT = 60;
const DURATION = 70;

const runTiming = (clock, shouldRun, onClockStart, onClockStop) => {
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
        cond(and(shouldRunValue, not(clockRunning(clock))), [
            startClock(clock),
            call([], onClockStart)
        ]),
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

function TaskListItem({ task, onSelect, onRemoveAnimationStart, onRemoveAnimationFinish }) {
    const [removing, setRemoving] = useState(false);

    function renderRemoveAction(progress, dragX) {
        return (
            <View style={styles.removeActionContainer}>
                <Text style={styles.removeActionText}>Otsosi</Text>
            </View>
        );
    }

    function handleSwipeRight() {
        setRemoving(true);
    }

    const { clock } = useMemoOne(() => ({
        clock: new Clock(),
    }), []);

    const progress = runTiming(clock, removing,
        () => {
            onRemoveAnimationStart(task.createdAt)
        },
        () => {
            onRemoveAnimationFinish(task.createdAt);
        }
    );

    const height = interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [HEIGHT, 0],
        extrapolate: Extrapolate.CLAMP,
    });

    return (
        <Animated.View style={{ height }}>
            <Swipeable
                friction={1.8}
                rightThreshold={80}
                renderRightActions={renderRemoveAction}
                onSwipeableRightOpen={handleSwipeRight}
            >
                {/* @TODO: Replace View with TouchableRipple (ripple effect starts on press or on swipe start)  */}
                <View>
                    <View style={styles.cardContainer}>
                        <ListItem title={task.name} subtitle={task.project} />
                    </View>
                </View>
            </Swipeable>
            <View style={{ flex: 1, width: '100%', height: 2, backgroundColor: 'white' }} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgb(20,20,20)',
    },
    removeActionText: {
        color: 'rgb(240,240,240)',
        fontWeight: 'bold',
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
