import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet, Image} from 'react-native';
import {Text, Card, ListItem} from '@rneui/themed';

function Episodes({route}) {
    const {episodeId} = route.params;
    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchEpisode = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
            const data = await response.json();
            setEpisode(data);
        };

        fetchEpisode();
    }, [episodeId]);

    useEffect(() => {
        const fetchCharacters = async () => {
            const fetchedCharacters = await Promise.all(episode.characters.map(async (url) => {
                const response = await fetch(url);
                const data = await response.json();
                return data;
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
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>Name: {episode.name}</ListItem.Title>
                    <ListItem.Subtitle>Episode: {episode.episode}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
            <FlatList
                data={characters}
                renderItem={({item}) =>
                    <Card>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Divider/>
                        <View style={styles.user}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{uri: item.image}}
                            />
                            <Text style={styles.name}>Species: {item.species}</Text>
                        </View>
                    </Card>
                }
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