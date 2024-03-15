import * as React from 'react';
import {Button, View, Text, FlatList} from 'react-native';
import {ListItem, Avatar} from '@rneui/themed';
import {useState} from "react";

function Home({navigation}) {
    const [data, setData] = React.useState(undefined);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);

    const getApiData = async () => {
        await fetch('https://rickandmortyapi.com/api/episode')
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                setIsLoaded(true);
            }, (error) => {
                setError(error);
                setIsLoaded(true);
            });
        console.log(data);
    }

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
                    data.map(item => (
                        <ListItem.Accordion
                            content={
                                <ListItem.Content>
                                    <ListItem.Title>
                                        {item.results.name}
                                    </ListItem.Title>
                                    <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
                                </ListItem.Content>
                            }
                            isExpanded={expanded}
                            onPress={() => {
                                setExpanded(!expanded);
                            }}
                        >
                            <ListItem>
                                <Avatar
                                    rounded
                                    source={{
                                        uri: "https://randomuser.me/api/portraits/men/32.jpg",
                                    }}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>John Doe</ListItem.Title>
                                    <ListItem.Subtitle>Principle Engineer</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                            <ListItem>
                                <Avatar
                                    rounded
                                    source={{
                                        uri: "https://randomuser.me/api/portraits/men/36.jpg",
                                    }}
                                />
                                <ListItem.Content>
                                    <ListItem.Title>Albert</ListItem.Title>
                                    <ListItem.Subtitle>Staff Engineer</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
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
