import {useState} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from "../Header";
import { useUser } from "../App/useUser";
import { useFavorites } from "../App/useFavorites";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();
    const {saveGitHubUsername, getGitHubUser} = useUser();
    const { resetFavorites } = useFavorites();
    const [newGithubUsernmae, setGithubUsernmae] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        saveGitHubUsername(newGithubUsernmae);
        resetFavorites();
    }

    const onChange = (event) => {
        setGithubUsernmae(event.target.value);
    }

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            <Header />
            {
                isAuthenticated ? (
                    <div className="Profile">
                        <img src={user.picture} alt={user.name} />
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        <p>Github Username: {getGitHubUser()}</p>

                        <p><b>*Important:</b> When you change the github user the favorite repos added will be reset</p>

                        <form onSubmit={onSubmit} >
                            <input
                                value = {newGithubUsernmae}
                                onChange = {onChange}
                                placeholder = "Github username"
                            />
                            <button
                                type= "submit"
                            >
                            Save
                            </button>
                        </form>

                    </div>
                ) : !isLoading ? (
                    <p>You should Login to view the profile page</p>
                ) : (
                    <p>Loading...</p>
                )
            }
            <Link to="/" className="HomeButton"><MdHome /></Link>
        </>
        
    );
};


export { Profile };