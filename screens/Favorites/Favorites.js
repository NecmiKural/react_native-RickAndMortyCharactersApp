import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';


function Favorites() {

    return (
        <View>

            <Text style={styles.title}>Favorites</Text>

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