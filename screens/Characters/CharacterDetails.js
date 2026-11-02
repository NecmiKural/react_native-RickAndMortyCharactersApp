import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import FavoritesButton from "../../components/FavoritesButton";
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite, removeFavorite} from '../../redux/actions/actions';
import {selectFavorites} from '../../redux/selectors/selector';

function CharacterDetails() {
    const dispatch = useDispatch();
    const favorites = useSelector(selectFavorites) || [];
    const route = useRoute();
    // Validate route parameters to prevent app crashes from malformed navigation state or deep links
    const character = route?.params && typeof route.params.character === 'object' ? route.params.character : null;
    const navigation = useNavigation();
    const [characterData, setCharacterData] = useState(null);
    const [isFavorite, setIsFavorite] = useState(
        character && character.id ? favorites.some((favorite) => favorite.id === character.id) : false
    );

    useEffect(() => {
        if (character && character.id) {
            setCharacterData(character);
            navigation.setOptions({
                title: character.name || 'Character',
                headerRight: () => <FavoritesButton navigation={navigation}/>
            });
        }
    }, [character, navigation]);

    useEffect(() => {
        if (character && character.id) {
            setIsFavorite(favorites.some((favorite) => favorite.id === character.id));
        }
    }, [favorites, character]);

    const handleFavoritePress = () => {
        if (!character || typeof character.id === 'undefined') {
            return;
        }
        if (isFavorite) {
            dispatch(removeFavorite(character));
        } else {
            if (favorites.length >= 10) {
                Alert.alert(
                    'Maximum number of favorites reached',
                    'You can only have up to 10 favorites. Remove a character from favorites to add a new one.',
                    [
                        {
                            text: 'OK',
                        },
                    ],
                    {cancelable: false}
                );
                return;
            }
            dispatch(addFavorite(character));
        }
        setIsFavorite(!isFavorite);
    };

    if (!character || !character.id) {
        return <Text style={styles.name}>Character details not found.</Text>;
    }

    if (!characterData) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="cover"
                source={{uri: characterData.image}}
            />
            <Text style={styles.name}>{characterData.name || 'Unknown'}</Text>
            <Text style={styles.status}>Status: {characterData.status || 'Unknown'}</Text>
            <Text style={styles.species}>Species: {characterData.species || 'Unknown'}</Text>
            <Text style={styles.type}>Type: {characterData.type || 'N/A'}</Text>
            <Text style={styles.gender}>Gender: {characterData.gender || 'Unknown'}</Text>
            <Text style={styles.origin}>Origin: {characterData.origin?.name || 'Unknown'}</Text>
            <Text style={styles.location}>Location: {characterData.location?.name || 'Unknown'}</Text>
            <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoritePress}>
                <Text
                    style={styles.favoriteButtonText}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text>
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

export default CharacterDetails;