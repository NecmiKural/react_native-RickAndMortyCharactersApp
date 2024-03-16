import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

function FavoritesButton() {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <View style={{marginRight: 16}}>
                <Icon name="favorite" type="material" color="red" />
            </View>
        </TouchableOpacity>
    );
}

export default FavoritesButton;