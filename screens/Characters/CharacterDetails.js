import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import FavoritesButton from "../../components/FavoritesButton";
import {useNavigation, useRoute} from "@react-navigation/native";

function CharacterDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { character } = route.params;

    const [characterData, setCharacterData] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const favorites = useSelector(selectFavorites);

    useEffect(() => {
        setCharacterData(character);
        navigation.setOptions({ title: character.name, headerRight: () => <FavoritesButton navigation={navigation} /> });
    }, [character, navigation]);

    useEffect(() => {
        setIsFavorite(favorites.some((favorite) => favorite.id === character.id));
    }, [favorites, character]);

    const handleFavoritePress = () => {
        if (isFavorite) {
            // remove from favorites
        } else {
            // add to favorites
        }
        setIsFavorite(!isFavorite);
    };

    if (!characterData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: characterData.image }}
            />
            <Text style={styles.name}>{characterData.name}</Text>
            <Text style={styles.status}>Status: {characterData.status}</Text>
            <Text style={styles.species}>Species: {characterData.species}</Text>
            <Text style={styles.type}>Type: {characterData.type || 'N/A'}</Text>
            <Text style={styles.gender}>Gender: {characterData.gender}</Text>
            <Text style={styles.origin}>Origin: {characterData.origin.name}</Text>
            <Text style={styles.location}>Location: {characterData.location.name}</Text>
            <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
                <Text style={styles.favoriteButtonText}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 300,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    status: {
        fontSize: 16,
        marginBottom: 4,
    },
    species: {
        fontSize: 16,
        marginBottom: 4,
    },
    type: {
        fontSize: 16,
        marginBottom: 4,
    },
    gender: {
        fontSize: 16,
        marginBottom: 4,
    },
    origin: {
        fontSize: 16,
        marginBottom: 4,
    },
    location: {
        fontSize: 16,
        marginBottom: 4,
    },
    favoriteButton: {
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 4,
        marginTop: 16,
    },
    favoriteButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

const selectFavorites = (state) => state.favorites.favorites;

export default CharacterDetails;