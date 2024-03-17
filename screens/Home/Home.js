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
    const [searchTerm, setSearchTerm] = useState('');
    const [episodes, setEpisodes] = useState([]);

    const getApiData = async (dataUrlId) => {
        if (dataUrlId <= 3) {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${dataUrlId}`);
                const result = await response.json();
                setEpisodes(prevItems => [...prevItems, ...result.results]);
                console.log(episodes.length);
                setData(prevData => [...prevData, ...result.results.slice(0, dataUrlId === 1 ? 11 : 10)]);
                setIsLoaded(true);
            } catch (error) {
                setError(error);
                setIsLoaded(true);
            }
        }
    };

    const searchEpisodes = async (searchTerm) => {
        if (searchTerm === "") {
            getApiData(currentPage);
        } else {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/episode/?name=${searchTerm}`);
                const result = await response.json();
                setData(result.results);
                setIsLoaded(true);
            } catch (error) {
                setError(error);
                setIsLoaded(true);
            }
        }
    };

    const loadMoreData = () => {
        if (currentPage < 3) {
            setCurrentPage(prevPage => prevPage + 1);
            getApiData(currentPage);
        }
    };
    const loadPreviousData = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
            getApiData(currentPage);
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
        totalItems: data.length + 1,
        itemsPerPage: currentPage === 1 ? 11 : 10,
        currentPage,
        totalPages,
        // onPageChange: (page) => {
        //     setCurrentPage(page);
        // }
        onPageChange: loadMoreData
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
                <Pagination
                    {...paginationProps}
                    onPageChange={(page) => {
                        if (page < currentPage) {
                            loadPreviousData();
                        } else {
                            setCurrentPage(page);
                            getApiData(page);
                        }
                    }}
                />
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