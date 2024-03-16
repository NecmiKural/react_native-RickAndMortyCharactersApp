import React, {useState, useEffect} from 'react';
import {
    Button,
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import {ListItem} from '@rneui/themed';
import FavoritesButton from '../../components/FavoritesButton';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';

function Home({navigation}) {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [expanded, setExpanded] = useState(new Array(0).fill(false));
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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

    const searchEpisodes = async (searchTerm) => {
        if (searchTerm === "") {
            getApiData(currentPage);
        } else {
            try {
                setIsLoadingMore(true);
                const response = await fetch(`https://rickandmortyapi.com/api/episode/?name=${searchTerm}`);
                const result = await response.json();
                setData(result.results);
                setExpanded(new Array(result.info.count).fill(false));
                setIsLoaded(true);
            } catch (error) {
                setError(error);
                setIsLoaded(true);
            } finally {
                setIsLoadingMore(false);
            }
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
                navigation.navigate('Episodes', {episodeId: item.id});
            }}
        >
        </ListItem.Accordion>
    );

    const paginationProps = {
        totalItems: 41, // Replace this with the actual total number of items
        itemsPerPage: 20,
        onPageChange: (page) => {
            setCurrentPage(page);
        },
    };

    if (error) {
        return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View style={styles.container}>
                <SearchBar holder={"Search Episodes"} term={searchTerm} onTermChange={setSearchTerm}
                           onTermSubmit={() => searchEpisodes(searchTerm)}/>
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
                <Pagination {...paginationProps} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default Home;