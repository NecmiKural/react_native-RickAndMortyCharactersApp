import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Avatar, ListItem, Text} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

function Episodes({route}) {
    const navigation = useNavigation();
    const {episodeId} = route.params;
    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([]);
    const handleCharacterPress = (character) => {
        navigation.navigate('CharacterDetails', {character});
    };

    useEffect(() => {
        const fetchEpisode = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
            const data = await response.json();
            setEpisode(data);
            navigation.setOptions({title: data.name});
        };

        fetchEpisode();
    }, [episodeId, navigation]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const fetchedCharacters = await Promise.all(episode.characters.map(async (url) => {
                const response = await fetch(url);
                return await response.json();
            }));
            setCharacters(fetchedCharacters);
        };

        if (episode) {
            fetchCharacters();
        }
    }, [episode]);

    if (!episode) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <FlatList
                data={characters}
                renderItem={({item}) => (
                    <ListItem key={item.id} onPress={() => handleCharacterPress(item)}>
                        <Avatar
                            rounded
                            source={{
                                uri: item.image,
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{item.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                )}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
});

export default Episodes;