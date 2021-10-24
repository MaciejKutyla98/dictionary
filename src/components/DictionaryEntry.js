import React, { useState, useEffect } from 'react';
import '../stylesheets/DictionaryEntry.css';
import {useParams} from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap';
import nextId from "react-id-generator";

export default function DictionaryEntry(props) {
    const [fetchedData, setFetchedData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [tittle, setTiittle] = useState('');
    const [partOfSpeech, setPartOfSpeech] = useState('');
    const { word } = useParams();

    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

    function fetchData () {
        url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + props.enteredWord;
        fetch(url)
            .then(response => response.json())
            .then(data => setFetchedData(transformFetchedData(data)))
            .catch(error => console.log('ERROR'))
            .finally(() => {
                setLoadingData(false);
            })
    }

    function transformFetchedData (fetchedData) {
        if (fetchedData !== null) {
            setTiittle(fetchedData[0].word);
            setPartOfSpeech(fetchedData[0].meanings[0].partOfSpeech);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    console.log(fetchedData)

    return (
            loadingData ?
            <div className="spinner">
                <ReactBootStrap.Spinner animation="grow" />
            </div>  :
                (
                    <div className="contentOfPage">
                        <h1>{tittle}</h1>
                        <p>{`Part of speech: ${partOfSpeech}`}</p>
                    </div>
)

    );
}