import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Home from "./screens/Home/Home";
import Episodes from "./screens/Episode/Episode";
import CharacterDetails from './screens/Characters/CharacterDetails';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Episodes" component={Episodes} />
              <Stack.Screen name="CharacterDetails" component={CharacterDetails} options={{ title: 'Character' }}  />
          </Stack.Navigator>
      </NavigationContainer>
  );
}
