import React, { useState, useEffect } from 'react';
import '../stylesheets/DictionaryEntry.css';
import {useParams} from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap';

export default function DictionaryEntry(props) {
    const [fetchedData, setFetchedData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const { word } = useParams();
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

    function fetchData () {
        url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + props.enteredWord;
        fetch(url)
            .then(response => response.json())
            .then(data => setFetchedData(data))
            .catch(error => console.log('ERROR'))
            .finally(() => {
                setLoadingData(false);
            })
    }

    useEffect(() => {
        fetchData();

    }, [])

    console.log(fetchedData)

    return (
        loadingData ?
            <div className="spinner">
                <ReactBootStrap.Spinner animation="grow" />
            </div>  :
            <h1>Witam</h1>

    );
}