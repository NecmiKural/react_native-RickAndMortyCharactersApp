import { TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';

const SearchBar = ({term, onTermChange, onTermSubmit, holder}) => {
    return (
        <TouchableOpacity style={styles.backgroundStyle} onPress={onTermSubmit}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder={holder}
                value={term}
                onChangeText={onTermChange}
            />
            <Button title="Search" onPress={onTermSubmit} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputStyle: {
        flex: 1,
        fontSize: 18,
    },
});

export default SearchBar;