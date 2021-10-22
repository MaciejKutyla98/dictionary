import React, { useState, useEffect } from 'react';
import '../stylesheets/SearchBox.css';
import {Link, useHistory} from "react-router-dom";

export default function SearchBox(props){
    const history = useHistory();
    const subPageUrl = `/${props.enteredWord}`;
    console.log(subPageUrl);

    return (
        <div className="wrapper">
            <input type="text"
                   className="input"
                   placeholder="What are you looking for?"
                   autoComplete="off"
                   onChange={ (e) =>{
                       props.onChange(e.target.value);
                   }}
            />
            <div className="searchbtn">
                <Link to={`${props.enteredWord}`}>
                    <button onClick={() => {
                        history.push("/test");
                    }}>
                        <i className="fas fa-search"></i>
                    </button>
                </Link>
            </div>
        </div>
    );
}