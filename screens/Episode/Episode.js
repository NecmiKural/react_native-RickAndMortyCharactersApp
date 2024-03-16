import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';

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
            <Text>Characters:</Text>
            <FlatList
                data={episode.characters}
                renderItem={({item}) => <Text>{item}</Text>}
                keyExtractor={item => item}
            />
        </View>
    );
}

export default Episodes;