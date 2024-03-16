import React, {useState, useEffect} from 'react';
import {Button, View, Text, FlatList, ActivityIndicator} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';
import FavoritesButton from "../../components/FavoritesButton";

function Home({navigation}) {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(new Array(0).fill(false));
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const getApiData = async (page) => {
        try {
            setIsLoadingMore(true);
            const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
            const result = await response.json();
            setData(prevData => [...prevData, ...result.results]);
            setExpanded(new Array(result.info.count).fill(false));
            setIsLoaded(true);
        } catch (error) {
            setError(error);
            setIsLoaded(true);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const loadMoreData = () => {
        if (currentPage < 3) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    useEffect(() => {
        getApiData(currentPage);
        navigation.setOptions({headerRight: () => <FavoritesButton navigation={navigation}/>});
    }, [currentPage]);

    const renderItem = ({item, index}) => (
        <ListItem.Accordion
            key={index}
            content={
                <ListItem.Content>
                    <ListItem.Title>
                        Episode Name: {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>Episode: {item.episode}</ListItem.Subtitle>
                </ListItem.Content>
            }
            isExpanded={expanded[index]}
            onPress={() => {
                setExpanded(expanded.map((value, i) => i === index ? !value : value));
                navigation.navigate('Episodes', {episodeId: item.id}); // pass episode id to navigation function
            }}
        >
            {
                item.characters.map((character, i) => (
                    <ListItem key={i}>
                        <Avatar
                            rounded
                            source={{
                                uri: character,
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>John Doe</ListItem.Title>
                            <ListItem.Subtitle>Principle Engineer</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>))
            }
        </ListItem.Accordion>
    );

    if (error) {
        return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        isLoadingMore ? (
                            <ActivityIndicator size="small" color="#0000ff"/>
                        ) : null
                    }
                />
                <Button
                    title="Load More"
                    onPress={loadMoreData}
                    disabled={currentPage >= 3}
                />
            </View>
        );
    }
}

export default Home;