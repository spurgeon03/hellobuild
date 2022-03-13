import React from "react";
import './Repository.css';

const Repository = ({children, name, url}) => (
    <li className="Repository">
        <p>Name: {name}</p>
        <p>URL: {url}</p>
        {children}
    </li>
);

export { Repository };