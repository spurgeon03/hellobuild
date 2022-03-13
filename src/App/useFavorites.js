import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

function useFavorites(){
    const {
        item: favorites,
        saveItem: saveFavorites,
    } = useLocalStorage('FAVORITES_V1', []);

      const [searchValue, setSearchValue] = useState('');

      const totalFavorites = favorites.length;
    
      let searchedFavorites = [];
    
      if (!searchValue.length >= 1) {
        searchedFavorites = favorites;
      } else {
        searchedFavorites = favorites.filter(favorite => {
          const favoriteText = favorite.name.toLowerCase();
          const searchText = searchValue.toLowerCase();
          return favoriteText.includes(searchText);
        });
      }

      const addFavorite = (repository) => {
        const newFavorites = [...favorites];
        newFavorites.push(repository);
        saveFavorites(newFavorites);
      }

      const deleteFavorite = (repositoryId) => {
        const favoriteIndex = favorites.findIndex(repository => repository.id === repositoryId);
        const newFavorites = [...favorites];
        newFavorites.splice(favoriteIndex, 1);
        saveFavorites(newFavorites);
      }

      const isFavorite = (repositoryId) => {
        const favoriteIndex = favorites.findIndex(repository => repository.id === repositoryId);
        return (favoriteIndex >= 0) ? true : false;
      }

      const resetFavorites = () =>{
        saveFavorites([]);
      }
          
      return {
        totalFavorites,
        searchValue,
        setSearchValue,
        searchedFavorites,
        addFavorite,
        deleteFavorite,
        isFavorite,
        resetFavorites
      };
}

export { useFavorites };