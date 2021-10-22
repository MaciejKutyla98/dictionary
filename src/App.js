import './App.css';
import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import SearchBox from "./components/SearchBox";
import DictionaryEntry from "./components/DictionaryEntry";

export default function App() {
    const [enteredWord, setEnteredWord] = useState('');

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
                    />
                </Route>
                <Route exact path="/:word">
                        <DictionaryEntry enteredWord={enteredWord}/>
                </Route>
            </Switch>
        </Router>

    </div>
  );
}

