import React from "react";
import { Header } from "../Header"
import { Repository } from "../Repository";
import { useFavorites } from "../App/useFavorites";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { RepositoriesSearch } from "../RepositoriesSearch";
import { useAuth0 } from "@auth0/auth0-react";
import "./Favorites.css"

const Favorites = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    const {
        totalFavorites,
        searchValue,
        setSearchValue,
        searchedFavorites,
        deleteFavorite
      } = useFavorites();  

    return (
        <React.Fragment>
            <Header />
            <div className="Favorites">
            {
                (isAuthenticated) ? (
                    <>
                        <h1>You have {totalFavorites} repositories added to Favorites</h1>
                        <RepositoriesSearch 
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                        />

                        <ul className="Repositories-List">
                            {
                                searchedFavorites.map(repository => (
                                    <Repository
                                            key={repository.id}
                                            name={repository.name}
                                            url={repository.url}
                                    >
                                        <span className="Icon Icon-delete" onClick={() => deleteFavorite(repository.id)}>X</span>
                                    </Repository>
                                ))
                            }
                        </ul>
                        <Link to="/" className="HomeButton"><MdHome /></Link>
                    </>
                ) : !isLoading ? (
                    <p>You should Login to view all your favorites repositories</p>
                ) : (
                    <p>Loading...</p>
                )
            }
            </div>
        </React.Fragment>
    );
};

export { Favorites };