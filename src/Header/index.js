import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../App/useUser";
import "./Header.css";

const Header = () => {
    const {user, isAuthenticated, logout, loginWithRedirect} = useAuth0();
    const {existGitHubUser, getGitHubUser} = useUser();

    return (
        <header className="Header">
            <div className="User">
                {
                    isAuthenticated ? (
                        <>
                            <Link to="profile" className="Username">{user.name}{existGitHubUser() ? `, Github User: ${getGitHubUser()}` : ""} </Link>
                            <button
                                className="ButtonLog"
                                onClick={() => logout({returnTo: window.location.origin})}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            className="ButtonLog"
                            onClick={() => loginWithRedirect()}
                        >
                            Login 
                        </button>
                    )
                }
            </div>            
        </header>
    );
};

export { Header };