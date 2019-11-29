import { useState } from 'react';
import { useMemoOne } from 'use-memo-one';
import Animated, { Easing } from 'react-native-reanimated';

const {
    Value,
    Clock,
    block,
    timing,
    call,
    cond,
    not,
    and,
    startClock,
    clockRunning,
    stopClock,
} = Animated;

const runTiming = (clock, { fromValue, toValue, duration }, onClockStart, onClockStop) => {
    const state = {
        position: new Value(fromValue),
        finished: new Value(0),
        frameTime: new Value(0),
        time: new Value(0),
    };
    const config = {
        toValue: new Value(toValue),
        duration,
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
        cond(and(state.finished, clockRunning(clock)),
            [
                stopClock(clock),
                call([], onClockStop),
            ],
        ),
        state.position
    ]);
}

function useTiming(
    config,
    onStart,
    onStop,
) {
    const [running, setRunning] = useState(false);
    const { clock } = useMemoOne(() => ({ clock: new Clock() }), []);

    const position = running ? runTiming(clock, config, onStart, onStop) : new Value(config.fromValue);

    function startTiming() {
        setRunning(true);
    }

    return {
        position,
        startTiming,
    };
}

export default useTiming;
