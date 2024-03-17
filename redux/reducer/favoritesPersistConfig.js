import { createMigrate } from 'redux-persist';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const migrations = {
    0: (state) => {
        // Add any necessary migration logic here, if needed
        return state;
    },
};

const migrate = createMigrate(migrations, { debug: false });

const favoritesPersistConfig = {
    key: 'favorites',
    storage: AsyncStorage,
    version: 0,
    migrate,
    whitelist: ['favorites'],
};

export default favoritesPersistConfig;