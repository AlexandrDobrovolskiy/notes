import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { EditTaskScreen, TasksScreen } from '#screens';

import { Screens } from '#lib/constants';
import Theme from '#theme';

const AppNavigator = createStackNavigator({
    [Screens.TASKS]: { screen: TasksScreen },
    [Screens.EDIT_TASK]: { screen: EditTaskScreen },
},
{
    initialRouteName: Screens.TASKS,
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Theme.HEADER_BG,
            borderBottomColor: Theme.HEADER_LINE,
        },
        headerTitleStyle: {
            color: Theme.HEADER_TEXT,
        },
        headerTintColor: 'white',
        headerMode: 'screen',
    },
});

export default createAppContainer(AppNavigator);