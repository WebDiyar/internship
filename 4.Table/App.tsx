import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import HomePage from './components/HomePage';
import Timesheet from './components/Timesheet';
import { RouteProp } from '@react-navigation/native';

// Define the types for your stack navigator parameters
export type RootStackParamList = {
  Home: undefined;
  Timesheet: { initialStartDate: Date };
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Timesheet" component={Timesheet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
