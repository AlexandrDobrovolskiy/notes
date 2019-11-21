import React, { Component, createRef } from 'react';
import { View } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';

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
            prevState.tasks.push(task);
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
            <View>
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
                    ListFooterComponent={(
                        <AddItemButton
                            title="Add Task"
                            submitButtonTitle="Done"
                            onSubmit={this.handleNewTask}
                        />
                    )}
                />
            </View>
        );
    }
};

export default TasksScreen;