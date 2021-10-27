import React, { useState, useEffect } from 'react';
import '../stylesheets/DictionaryEntry.css';
import {useParams} from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap';
import nextId from "react-id-generator";

export default function DictionaryEntry(props) {
    const [fetchedData, setFetchedData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [tittle, setTittle] = useState('');
    const [partOfSpeech, setPartOfSpeech] = useState('');
    const [definitions, setDefinitions] = useState([]);
    const { word } = useParams();
    const fetchedDefinitions = [];
    const randomId = nextId();

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
            setTittle(fetchedData[0].word);
            setPartOfSpeech(fetchedData[0].meanings[0].partOfSpeech);
            for (let i = 0; i < (fetchedData[0].meanings[0].definitions.length); i++) {
                fetchedDefinitions.push(fetchedData[0].meanings[0].definitions[i].definition);
            }
            setDefinitions(fetchedDefinitions);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
            loadingData ?
            <div className="spinner">
                <ReactBootStrap.Spinner animation="grow" />
            </div>  :
                (
                    <div className="contentOfPage">
                        <h1>{`Subject : ${tittle}`}</h1>
                        <h2>{`Part of speech: ${partOfSpeech}`}</h2>
                        <h3>{`Definition: `}</h3>
                        {definitions.map((definition) => {
                            return (
                                <ul>
                                    <li key={randomId}>
                                        {definition}
                                    </li>
                                </ul>
                            )
                        })}
                    </div>
                )
            );
}