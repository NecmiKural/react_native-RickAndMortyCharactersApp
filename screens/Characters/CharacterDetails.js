import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

function CharacterDetails() {
    const navigation = useNavigation();
    const route = useRoute();
    const { character } = route.params;

    const [characterData, setCharacterData] = useState(null);

    useEffect(() => {
        setCharacterData(character);
        navigation.setOptions({ title: character.name });
    }, [character, navigation]);

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
});

export default CharacterDetails;
//
// import {addFavorite, removeFavorite} from './favoritesActions';
//
// function CharacterDetails({route, navigation}) {
//     const {character} = route.params;
//     const dispatch = useDispatch();
//     const favorites = useSelector((state) => state.favorites.favorites);
//
//     const isFavorite = favorites.some((favorite) => favorite.id === character.id);
//
//     const handleFavoritePress = () => {
//         if (isFavorite) {
//             dispatch(removeFavorite(character));
//         } else {
//             dispatch(addFavorite(character));
//         }
//     };
//
//     return (
//         <View>
//             <FavoritesButton navigation={navigation} />
//             <Image
//                 style={styles.image}
//                 resizeMode="cover"
//                 source={{uri: character.image}}
//             />
//             <Text style={styles.name}>{character.name}</Text>
//             <Text style={styles.status}>Status: {character.status}</Text>
//             <Text style={styles.species}>Species: {character.species}</Text>
//             <Text style={styles.type}>Type: {character.type || 'N/A'}</Text>
//             <Text style={styles.gender}>Gender: {character.gender}</Text>
//             <Text style={styles.origin}>Origin: {character.origin.name}</Text>
//             <Text style={styles.location}>Location: {character.location.name}</Text>
//             <Button title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} onPress={handleFavoritePress} />
//         </View>
//     );
// }
// export const addFavorite = (character) => ({
//     type: 'ADD_FAVORITE',
//     payload: character,
// });
//
// export const removeFavorite = (character) => ({
//     type: 'REMOVE_FAVORITE',
//     payload: character,
// });