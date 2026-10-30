import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Avatar, ListItem, Text} from '@rneui/themed';
import FavoritesButton from '../../components/FavoritesButton';
import {useNavigation} from "@react-navigation/native";
import SearchBar from '../../components/SearchBar';

function Episodes({route}) {
    const navigation = useNavigation();
    const {episodeId} = route.params;
    const [episode, setEpisode] = useState(null);
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleCharacterPress = (character) => {
        navigation.navigate('CharacterDetails', {character});
    };

    const searchCharacters = async (searchTerm) => {
        if (searchTerm === "") {
            setCharacters([]);
        } else {
            try {
                // Sanitize search term using encodeURIComponent to prevent URL parameter injection
                const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchTerm)}`);
                if (!response.ok) {
                    setCharacters([]);
                    return;
                }
                const result = await response.json();
                setCharacters(Array.isArray(result?.results) ? result.results : []);
            } catch (error) {
                console.error('Failed to search characters');
            }
        }
    };

    useEffect(() => {
        const fetchEpisode = async () => {
            try {
                // Sanitize route parameter episodeId to prevent path traversal / URL manipulation
                const response = await fetch(`https://rickandmortyapi.com/api/episode/${encodeURIComponent(episodeId)}`);
                const data = await response.json();
                setEpisode(data);
                navigation.setOptions({title: data.name, headerRight: () => <FavoritesButton navigation={navigation}/>});
            } catch (error) {
                console.error('Failed to fetch episode details');
            }
        };

        fetchEpisode();
    }, [episodeId, navigation]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                // Validate character URLs to ensure requests are only sent to trusted API endpoints
                const validUrls = (episode.characters || []).filter(url => typeof url === 'string' && url.startsWith('https://rickandmortyapi.com/api/character/'));
                const fetchedCharacters = await Promise.all(validUrls.map(async (url) => {
                    const response = await fetch(url);
                    return await response.json();
                }));
                setCharacters(fetchedCharacters);
            } catch (error) {
                console.error('Failed to fetch characters');
            }
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
            <SearchBar holder={"Search Characters"} term={searchTerm} onTermChange={setSearchTerm}
                       onTermSubmit={() => searchCharacters(searchTerm)}/>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title>Name: {episode.name}</ListItem.Title>
                    <ListItem.Subtitle>Episode: {episode.episode}</ListItem.Subtitle>
                    <ListItem.Subtitle>Characters</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
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

export default Episodes;