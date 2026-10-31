import { TextInput, StyleSheet, TouchableOpacity, Button} from 'react-native';

const SearchBar = ({term, onTermChange, onTermSubmit, holder}) => {
    const handleSubmit = () => {
        if (onTermSubmit) {
            onTermSubmit();
        }
    };

    return (
        <TouchableOpacity style={styles.backgroundStyle} onPress={handleSubmit}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.inputStyle}
                placeholder={holder}
                value={term}
                onChangeText={onTermChange}
                // Enforce maximum length to prevent DoS / unbounded input memory abuse
                maxLength={100}
                onSubmitEditing={handleSubmit}
            />
            <Button title="Search" onPress={handleSubmit} />
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