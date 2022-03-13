import React from "react";
import { Link } from "react-router-dom";
import './RegisterForm.css';

class RegisterForm extends React.Component{
    render(){
        return (
            <React.Fragment>
                <h1>Create Account</h1>
                <input 
                    className="Input"
                    placeholder="username"
                />

                <input 
                    className="Input"
                    placeholder="password"
                />

                <input 
                    className="Input"
                    placeholder="Confirm password"
                />

                <input 
                    className="Input"
                    placeholder="GitHub username"
                />

                <button
                    className="Button"
                >
                    Register
                </button>

                <Link to="login">I Already have an Account</Link>
            </React.Fragment>
        );
    }
}

export { RegisterForm };