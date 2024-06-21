import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
const Header = () => {
    return (
        <>
        <h1>NC News</h1>
        <nav>
            <ul>
                <li>
                       <Link to='/'>Home</Link> 
                </li>
                <li>
                        <Link to='/articles'>Articles</Link>
                </li>
                <li>
                        <Link to='/topics'>Topics</Link>
                </li>
            </ul>
        </nav>
        </>
    )
} 

export default Header;