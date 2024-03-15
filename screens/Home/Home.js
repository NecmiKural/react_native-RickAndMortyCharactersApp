import * as React from 'react';
import { Button, View, Text } from 'react-native';

function Home({ navigation }) {

    // axios ve model kullabılabilir
    const [data, setData] = React.useState(undefined);

    const getApiData = async () => {
        let result = await fetch('https://rickandmortyapi.com/api/episode')
            .then((response) => response.json())
            .then((json) => console.log(json))
            .catch((error) => console.error(error));
        setData(result);
    }

    React.useEffect(() => {
        getApiData()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Text>{data}</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Episodes')}
            />
        </View>
    );
}


export default Home;
