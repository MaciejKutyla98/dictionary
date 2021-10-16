import './App.css';
import React, { useState, useEffect } from 'react';
import * as ReactBootStrap from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SearchBox from "./components/SearchBox";
import DictionaryEntry from "./components/DictionaryEntry";

export default function App() {
    const [enteredWord, setEnteredWord] = useState('');
    const [fetchedData, setFetchedData] = useState(null);
    const [loadingData, setLoadingData] = useState(false);

    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

    function fetchData () {
        url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + enteredWord;
        fetch(url)
        .then(response => response.json())
        .then(data => setFetchedData(data))
        .catch(error => console.log('ERROR'))
        setLoadingData(true);
     }

    console.log(fetchedData);
  return (
    <div className="Dictionary">
        <Router>
            <Switch>
                <Route exact path="/">
                    <SearchBox
                        onChange={(newValue) => {
                            setEnteredWord(newValue)
                        }}
                        enteredWord={enteredWord}
                        onClick={fetchData}
                    />
                </Route>
                <Route exact path={enteredWord}>
                    {loadingData ? <DictionaryEntry /> : <ReactBootStrap.Spinner animation="grow" />}
                </Route>
            </Switch>
        </Router>

    </div>
  );
}

