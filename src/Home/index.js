import React from "react";
import { Header } from "../Header"
import { Repository } from "../Repository";
import "./Home.css"
import { useAuth0 } from "@auth0/auth0-react";
import { useFavorites } from "../App/useFavorites";
import {useRepositories } from "../App/useRepositories";
import { MdFavorite } from "react-icons/md";
import { Link } from "react-router-dom";
import { RepositoriesSearch } from "../RepositoriesSearch";
import { useUser } from "../App/useUser";


const Home = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    const {existGitHubUser} = useUser();

    const {
        addFavorite,
        isFavorite,
    } = useFavorites();

    const {
        totalRepositories,
        searchedRepositories,
        searchValue,
        setSearchValue,
    } = useRepositories();

    if(isLoading){
        return (
            <div className="Home">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <>            
            <Header />
            <div className="Home">
            {
                (isAuthenticated && existGitHubUser()) ? (
                    <>
                        <h1>You have {totalRepositories} repositories.</h1>  
            
                        <RepositoriesSearch 
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />

                        {
                            (isLoading) && <p>Loading...</p>
                        }

                        <ul className="Repositories-List">
                            {
                                searchedRepositories.map(repository => (
                                <Repository 
                                    key={repository.id}
                                    name={repository.name}
                                    url={repository.url}
                                >
                                    {
                                        !isFavorite(repository.id) && (
                                            <button 
                                                className="AddFavorite"
                                                onClick={() => addFavorite(repository)}
                                            >
                                                <MdFavorite/>
                                            </button>
                                        ) 
                                    }                        
                                </Repository>
                                ))
                            }
                        </ul>
                        <Link to="favorites" className="FavoritesButton"><MdFavorite/></Link>
                    </>
                ) : !existGitHubUser() ? (
                    <p>Before you can look all your repositories, you have to save your username on the <Link to="profile">Profile Page</Link></p>                                        
                ) : (
                    <p>You should Login to view all your repositories</p>
                )
            }
            </div>
        </>   
    );
};


export { Home };