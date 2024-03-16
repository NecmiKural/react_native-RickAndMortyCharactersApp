import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import Home from "./screens/Home/Home";
import Episodes from "./screens/Episode/Episode";
import CharacterDetails from './screens/Characters/CharacterDetails';
import Favorites from "./screens/Favorites/Favorites";

const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{title: 'R&M Episodes'}}/>
                <Stack.Screen name="Episodes" component={Episodes} options={{title: 'Episode'}}/>
                <Stack.Screen name="CharacterDetails" component={CharacterDetails} options={{title: 'Character'}}/>
                <Stack.Screen name="Favorites" component={Favorites} options={{title: 'Favorite Characters'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
