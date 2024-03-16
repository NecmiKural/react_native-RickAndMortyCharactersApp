import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFavorite} from '../../redux/actions/actions';
import {selectFavorites} from '../../redux/selectors/selector';
import {useNavigation} from '@react-navigation/native';
import {Icon, Avatar, ListItem, Text} from "@rneui/themed";

function Favorites() {
    const navigation = useNavigation();
    const favorites = useSelector(selectFavorites);
    const dispatch = useDispatch();

    const handleRemoveFavorite = (character) => {
        Alert.alert(
            'Remove Favorite',
            'Are you sure you want to remove this favorite?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                    },
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        dispatch(removeFavorite(character));
                    },
                },
            ],
            {cancelable: false}
        );
    };

    const handleFavoritePress = (character) => {
        navigation.navigate('CharacterDetails', {character: character});
    };

    return (
        <View>
            {
                favorites.length > 0 ?
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <ListItem key={`${item.id}-listItem`}>
                                <TouchableOpacity onPress={() => handleFavoritePress(item)}
                                                  style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Avatar
                                        rounded
                                        source={{
                                            uri: item.image,
                                        }}

                                    />
                                    <ListItem.Content style={{marginLeft: 8}}>
                                        <ListItem.Title>{item.name}</ListItem.Title>
                                    </ListItem.Content>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleRemoveFavorite(item)}
                                                  style={{marginLeft: 'auto'}}>
                                    <Icon
                                        name='trash'
                                        type='font-awesome'
                                        color='#f50057'
                                        size={24}
                                    />
                                </TouchableOpacity>
                            </ListItem>
                        )
                        }
                    />
                    : <Text style={styles.noFavorites}>No favorites</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    noFavorites: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
        color: '#888',
    },
});

export default Favorites;