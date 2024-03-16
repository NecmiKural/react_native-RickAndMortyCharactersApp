import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text, Card} from '@rneui/themed';

function Episodes({route}) {
    const {episodeId} = route.params;
    const [episode, setEpisode] = useState(null);

    useEffect(() => {
        const fetchEpisode = async () => {
            const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeId}`);
            const data = await response.json();
            setEpisode(data);
        };

        fetchEpisode();
    }, [episodeId]);

    if (!episode) {
        return <Text>Loading...</Text>;
    }

    return (
        <View>
            <Text>Name: {episode.name}</Text>
            <Text>Episode: {episode.episode}</Text>
            {/*<Text>Characters:</Text>*/}
            <FlatList
                data={episode.characters}
                renderItem={({item}) =>
                    <Card>
                        <Card.Title>Characters</Card.Title>
                        <Card.Divider/>
                        {item.map((u, i) => {
                            return (
                                <View key={i} style={styles.user}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={{uri: u.avatar}}
                                    />
                                    <Text style={styles.name}>{u.name}</Text>
                                </View>
                            );
                        })}
                    </Card>
                }
                keyExtractor={item => item}
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
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
});
export default Episodes;