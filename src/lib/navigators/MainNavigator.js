import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ProjectScreen, TasksScreen } from '#screens';

import Theme from '#theme';

const AppNavigator = createStackNavigator({
    Tasks: { screen: TasksScreen },
    Project: { screen: ProjectScreen },
},
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Theme.HEADER_BG,
            borderBottomColor: Theme.HEADER_LINE,
        },
        headerTitleStyle: {
            color: Theme.HEADER_TEXT
        },
        headerTintColor: 'white',
        headerMode: 'screen',
    },
});

export default createAppContainer(AppNavigator);