import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';

import Store from '#lib/storage/SxsStore';
import Task from '../../lib/models/Task';
import TaskListItem from './TaskListItem';
import { FlatList } from 'react-native-gesture-handler';
import { useMemoOne } from 'use-memo-one';

import { Screens } from '#lib/constants';


function TasksScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);
    let { started, finished } = useMemoOne(() => ({
        started: [],
        finished: [],
    }), []);

    useEffect(() => {
        Store.getTasks()
            .then(data => {
                if (data) {
                    setTasks(data);
                }
            });
    }, []);

    function handleRemoveTransitionStart(id) {
        started.push(id);
    }

    function handleRemoveTransitionFinish(id) {
        finished.push(id);
        if (started.every(el => finished.includes(el))) {
            removeMany(finished);
            started = [];
            finished = [];
        }
    }

    function removeMany(ids) {
        const updated = tasks.filter(t => !ids.includes(t.id));
        Store.resetTasks(updated).then(() => {
            setTasks(updated);
        });
    }

    function handleNewTask(name) {
        const task = new Task(name, 'project');
        setTasks(t => [task, ...t]);
        Store.addTask(task);
    }

    function handleDoneButtonPress(id) {
        setTasks(tasks => {
            const updateAt = tasks.findIndex(t => t.id === id);
            const updated = [...tasks];

            if (~updateAt) {
                updated[updateAt].done = !updated[updateAt].done;
            }
            Store.resetTasks(updated);
            return updated;
        });
    }

    function handleSelectTask() {
        navigation.navigate(Screens.EDIT_TASK);
    }

    function keyExtractor({ name, id }) {
        return `${name}_${id}`;
    }

    function renderItem({ item }) {
        return (
            <TaskListItem
                task={{ ...item, project: item.projectID }}
                onRemoveTransitionStart={handleRemoveTransitionStart}
                onRemoveTransitionFinish={handleRemoveTransitionFinish}
                onDoneButtonPress={handleDoneButtonPress}
                onSelect={handleSelectTask}
            />
        );
    }

    function getItemLayout(_, index) {
        return ({ length: 60, offset: 60 * index, index })
    }

    return (
        <View style={{ flex: 1,  backgroundColor: 'rgb(20,20,20)' }}>
            <FlatList
                data={tasks}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
            />
            <TouchableWithoutFeedback onPress={() => { handleNewTask("shit") }}>
                <View style={styles.addButtonContainer}>
                    <Text>+</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

TasksScreen.navigationOptions = () => ({
    title: 'Tasks',
});

const styles = StyleSheet.create({
    addButtonContainer: {
        color: 'white',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        right: 0,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
});

export default TasksScreen;