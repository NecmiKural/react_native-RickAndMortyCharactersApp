import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {ListItem, Avatar} from '@rneui/themed';

function Favorites() {
    const favorites = useSelector((state) => state.favorites);

    return (
        <View>
            <Text style={styles.title}>Favorites</Text>
            <FlatList
                data={favorites}
                renderItem={({item}) => (
                    <ListItem key={item.id} bottomDivider>
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
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginLeft: 16,
    },
});

export default Favorites;