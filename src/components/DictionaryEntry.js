import React, { useState, useEffect } from 'react';
import '../stylesheets/DictionaryEntry.css';
import {useParams} from "react-router-dom";
import {Spinner} from 'react-bootstrap';
import nextId from "react-id-generator";

export default function DictionaryEntry(props) {
    const [fetchedData, setFetchedData] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const { word } = useParams();
    const randomId = nextId();
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';


    function fetchData () {
        url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
        fetch(url)
            .then(response => response.json())
            .then(data => setFetchedData(transformFetchedData(data)))
            .catch(error => console.log('ERROR'))
            .finally(() => {
                setLoadingData(false);
            })
    }

    function transformFetchedData (fetchedData) {
        const result = {
            fetchedDefinitions: []
        };

        if (fetchedData !== null) {
            result.title = fetchedData[0].word;
            result.partOfSpeech = fetchedData[0].meanings[0].partOfSpeech;
            fetchedData[0].meanings[0].definitions.forEach((definition) => {
                result.fetchedDefinitions.push(definition.definition);
                console.log(definition);
            });
        }
        console.log(fetchedData)
        console.log(result)
        return result;
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
            loadingData ?
            <div className="spinner">
                <Spinner animation="grow" />
            </div>  :
                (
                    <div className="contentOfPage">
                        <h1 className="subject">{`Subject : ${fetchedData.title}`}</h1>
                        <h2 className="partOfSpeech">{`Part of speech: ${fetchedData.partOfSpeech}`}</h2>
                        <h3 className="definition">{`Definition: `}</h3>
                        {fetchedData.fetchedDefinitions.map((definition, index) => {
                            return (
                                <ul key={index} className="definitionsList">
                                    <li  className="definitionsItem">
                                        {definition}
                                    </li>
                                </ul>
                            )
                        })}
                    </div>
                )
            );
}