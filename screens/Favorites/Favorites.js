import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFavorite} from '../../redux/actions/actions';
import {selectFavorites} from '../../redux/selectors/selector';
import {Icon} from "@rneui/base";

function Favorites() {
    const favorites = useSelector(selectFavorites);
    const dispatch = useDispatch();

    const handleRemoveFavorite = (character) => {
        // Show confirmation dialog
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
                    onPress: () => dispatch(removeFavorite(character)),
                },
            ],
            {cancelable: false}
        );
    };

    return (
        <View>
            <Text style={styles.title}>Favorites</Text>
            {
                favorites.length > 0 ?
                    <FlatList
                        data={favorites}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.favoriteItem}>
                                <Text style={styles.favoriteName}>{item.name}</Text>
                                <TouchableOpacity onPress={() => handleRemoveFavorite(item)}>
                                    <Icon
                                        name='trash'
                                        type='font-awesome'
                                        color='#f50057'
                                        size={24}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                    : <Text style={styles.noFavorites}>No favorites</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
    },
    noFavorites: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
        color: '#888',
    },
});

export default Favorites;