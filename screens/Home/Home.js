import * as React from 'react';
import {Button, View, Text, FlatList} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';
import {useState} from "react";

function Home({navigation}) {
    const [data, setData] = React.useState(undefined);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [expanded, setExpanded] = React.useState(new Array(0).fill(false));

    const getApiData = async () => {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/episode');
            const result = await response.json();
            setData(result);
            setExpanded(new Array(result.info.count).fill(false));
            setIsLoaded(true);
        } catch (error) {
            setError(error);
            setIsLoaded(true);
        }
    };

    React.useEffect(() => {
        getApiData();
    }, [data])

    if (error) {
        return <Text>Error: {error.message}</Text>;
    } else if (!isLoaded) {
        return <Text>Loading...</Text>;
    } else {
        return (
            <View>
                {
                    data.results.map((item, index) => (
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
                            }}
                        >
                            {
                                item.characters.map((character, i) => (
                                    <ListItem key={i}>
                                        <Avatar
                                            rounded
                                            source={{
                                                uri: character[i],
                                            }}
                                        />
                                        <ListItem.Content>
                                            <ListItem.Title>John Doe</ListItem.Title>
                                            <ListItem.Subtitle>Principle Engineer</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>))
                            }
                        </ListItem.Accordion>
                    ))
                }
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Episodes')}
                />
            </View>
        );
    }
}

export default Home;
