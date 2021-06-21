
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AudioPlay from "../Screens/AudioPlay/AudioPlay";
import AudioRecoder from "../Screens/AudioRecoder/AudioRecoder";

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="audioRecoder" component={AudioRecoder} />
                <Stack.Screen name="audioPlay" component={AudioPlay} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes