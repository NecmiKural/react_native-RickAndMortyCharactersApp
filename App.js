import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from "./screens/Home/Home";
import Episodes from "./screens/Episode/Episode";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'Overview' }} />
        <Stack.Screen name="Episodes" component={Episodes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
