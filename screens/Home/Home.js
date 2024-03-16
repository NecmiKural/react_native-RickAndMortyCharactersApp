import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import {ListItem} from '@rneui/themed';
import FavoritesButton from '../../components/FavoritesButton';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';

function Home({navigation}) {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const getApiData = async (page) => {
        if (page <= 3) {
            try {
                setIsLoadingMore(true);
                const itemsPerPage = page === 1 ? 11 : 10;
                const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
                const result = await response.json();
                setData(prevData => [...prevData, ...result.results.slice(0, itemsPerPage)]);
                setIsLoaded(true);
                console.log(data.length);

            } catch (error) {
                setError(error);
                setIsLoaded(true);
            } finally {
                setIsLoadingMore(false);
            }
        }
    };

    const loadMoreData = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
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
        <ListItem
            key={index}>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Episodes', {episodeId: item.id});
            }}>
                <ListItem.Content>
                    <ListItem.Title>
                        Episode Name: {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle>Episode: {item.episode}</ListItem.Subtitle>
                </ListItem.Content>
            </TouchableOpacity>
        </ListItem>
    );

    const totalPages = 5;

    const paginationProps = {
        totalItems: data.length+1,
        itemsPerPage: currentPage === 1 ? 11 : 10,
        currentPage,
        totalPages,
        onPageChange: loadMoreData,
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
                />
                <Pagination {...paginationProps}
                            onPageChange={loadMoreData}/>
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