import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function CharacterDetails({ route }) {
    const { character } = route.params;

    const [characterData, setCharacterData] = useState(null);

    useEffect(() => {
        setCharacterData(character);
    }, [character]);

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