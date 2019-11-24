import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';

import Store from '#lib/storage/SxsStore';
import Task from '../../lib/models/Task';

import AddItemButton from '../../lib/components/AddItemButton';
import TaskListItem from './TaskListItem';
import { FlatList } from 'react-native-gesture-handler';

class TasksScreen extends Component {
    static navigationOptions = () => ({
        title: 'Tasks',
    });

    state = {
        tasks: [],
    }

    componentDidMount() {
        Store.getTasks().then(tasks => {
            if (tasks) {
                this.setState({ tasks });
            }
        });
    }

    handleNewTask = (name) => {
        const task = new Task(name, 'project');
        this.setState(prevState => {
            prevState.tasks.unshift(task);
            return prevState;
        });
        Store.addTask(task);
    }

    handleTaskPressed = (id) => {
        this.setState(state => {
            const updateAt = state.tasks.findIndex(t => t.createdAt == id);
            const updated = [...state.tasks];

            if (~updateAt) {
                updated[updateAt].done = !updated[updateAt].done;
            }

            return { ...state, tasks: updated };
        }, () => {
            // @TODO: update tasks cache
        });
    }

    handleTaskRemoveButtonPressed = (id) => {
        this.setState(state => {
            const removeAt = state.tasks.findIndex(t => t.createdAt == id);
            const updated = [...state.tasks];

            if (~removeAt) {
                updated.splice(removeAt, 1);
            }

            return { ...state, tasks: updated };
        }, () => {
            Store.resetTasks(this.state.tasks);
        });
    }

    keyExtractor({ name, createdAt }) {
        return `${name}_${createdAt}`;
    }

    render() {
        const { tasks } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={tasks}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item }) => (
                        <TaskListItem
                            task={{ ...item, project: item.projectID }}
                            onPress={this.handleTaskPressed}
                            onRemove={this.handleTaskRemoveButtonPressed}
                        />
                    )}
                    // @TODO: Replace this with separator in TaskListItem (those are stacking on multiple remove with animation)
                    ItemSeparatorComponent={() => <View style={{ width: '100%', height: 1, backgroundColor: 'rgb(40,40,40)' }} />}
                />
                <TouchableWithoutFeedback onPress={() => { this.handleNewTask("gavno" + Math.random()) }}>
                    <View style={{ color: 'white', fontWeight: 'bold', position: 'absolute', bottom: 0, backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', margin: 10, right: 0, width: 50, height: 50, borderRadius: 25 }}>
                        <Text>+</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
};

export default TasksScreen;