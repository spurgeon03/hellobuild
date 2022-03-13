import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useUser } from "../App/useUser";

function useRepositories(){
    const [repositories, setRepositories] = React.useState([]);
    const {getGitHubUser} = useUser();

    const GetRepositoriesQuery = gql`
      query GetRepositoriesUser ($owner: String!) {
          user(login: $owner) {
              repositories(first: 100) {
                  nodes {
                      id, 
                      name,
                      url
                  }
              }
          }
      }
    `;


    const {
        loading: loadingGithub, 
        error, 
        data
      } = useQuery( GetRepositoriesQuery, {variables: {owner: getGitHubUser()}} );

    React.useEffect(() => {
      if(!loadingGithub){
        const current = (data?.user && data.user.repositories.nodes ) ? data.user.repositories.nodes : [];
        setRepositories(current);
      }
    }, [loadingGithub]); 
  
    const [searchValue, setSearchValue] = React.useState('');

    const totalRepositories = repositories.length;

    let searchedRepositories = [];

    if (!searchValue.length >= 1) {
        searchedRepositories = repositories;
    } else {
        searchedRepositories = repositories.filter(favorite => {
            const favoriteText = favorite.name.toLowerCase();
            const searchText = searchValue.toLowerCase();
            return favoriteText.includes(searchText);
        });
    }
        
    return {
        totalRepositories,
        searchValue,
        setSearchValue,
        searchedRepositories,
    };
}

export { useRepositories };