import * as React from 'react';
import {Button, View, Text, FlatList} from 'react-native';

function Home({navigation}) {

    // axios ve model kullabılabilir
    const [data, setData] = React.useState(undefined);

    const getApiData = async () => {
        let result = await fetch('https://rickandmortyapi.com/api/episode')
            .then((response) => response.json())
            .catch((error) => console.error(error));
        setData(result);
        console.log(data.info)
    }

    React.useEffect(() => {
        getApiData()
    }, [])

    const renderItem = ({item}) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc'
        }}>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            {data ? (
                <FlatList
                    data={data.results}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            ) : (
                <Text>Loading...</Text>
            )}
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Episodes')}
            />
        </View>
    );
}


export default Home;
