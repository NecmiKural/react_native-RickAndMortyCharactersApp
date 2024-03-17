In this React Native application user can see episodes and characters of Rick and Morty and able to add characters to favorite.
--
On home page user can see episodes of Rick and Morty. User able to search an episode from search bar. If user scrolls down the application brings new data with lazy load pagination.

After the user selects an episode, the application goes to that episode's page. Users can see characters in this episode. Users can search for specific characters from the search bar.

If the user clicks a character, the application will show details of that character. On this page user can add that character to the favorites, or remove it.

On every page, there is a favorites button on the app bar that user can go to the favorites page. Favorite characters are saved with Redux/Toolkit and AsyncStorage.
Users can only have a maximum of 10 favorite characters. If the user wants to add more applications show a warning with a local notification. On the favorites screen, the user can delete a favorite character to add a diffrent favorite character.
