import { ListItem, Avatar } from '@rneui/themed';

const CharacterListItem = ({ character }) => {
    return (
        <ListItem>
            {character && (
                <Avatar
                    rounded
                    source={{
                        uri: character.image,
                    }}
                />
            )}
            <ListItem.Content>
                <ListItem.Title>{character ? character.name : 'Unknown'}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    );
};

export default CharacterListItem;