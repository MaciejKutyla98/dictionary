import React, { useState, useEffect } from 'react';
import '../stylesheets/SearchBox.css';
import {Link} from "react-router-dom";

export default function SearchBox(props){
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
                    <button onClick={() => props.onClick()}>
                        <i className="fas fa-search"></i>
                    </button>
                </Link>
            </div>
        </div>
    );
}